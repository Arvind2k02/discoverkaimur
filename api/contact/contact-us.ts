import express, { type ErrorRequestHandler } from "express";
import { readFileSync } from "node:fs";
import { join } from "node:path";

interface ContactFormEntry {
	brandId: string;
	categoryId: number | string;
	overrideEmail?: string;
}

interface ContactFormConfig {
	forms: Record<string, ContactFormEntry>;
}

interface RateBucket {
	count: number;
	resetAt: number;
}

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const rateBuckets = new Map<string, RateBucket>();

function loadContactConfig(): ContactFormConfig | null {
	const candidates = [
		join(process.cwd(), "contact-form.config.json"),
		join(process.cwd(), "src", "lib", "contact-form.config.json"),
	];

	for (const filePath of candidates) {
		try {
			return JSON.parse(readFileSync(filePath, "utf8")) as ContactFormConfig;
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
				console.error("[contact] config read error", {
					path: filePath,
					error: error instanceof Error ? error.message : String(error),
				});
				return null;
			}
		}
	}

	console.error("[contact] contact-form.config.json not found");
	return null;
}

function getVisitorIp(req: express.Request): string {
	const cfIp = req.headers["cf-connecting-ip"];
	if (typeof cfIp === "string" && cfIp.trim()) return cfIp.trim();

	const forwardedFor = req.headers["x-forwarded-for"];
	if (typeof forwardedFor === "string" && forwardedFor.trim()) {
		return forwardedFor.split(",")[0]?.trim() ?? "";
	}

	return req.socket?.remoteAddress ?? req.ip ?? "unknown";
}

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	for (const [key, bucket] of rateBuckets) {
		if (now > bucket.resetAt) rateBuckets.delete(key);
	}

	const bucket = rateBuckets.get(ip);
	if (!bucket) {
		rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
		return false;
	}
	if (bucket.count >= RATE_LIMIT) return true;

	bucket.count++;
	return false;
}

function resolveInboxHost(): string {
	const apiBase = process.env.GODADDY_API_BASE_URL || "";
	if (apiBase.includes("dev-godaddy.com")) return "reamaze.dev-godaddy.com";
	if (apiBase.includes("test-godaddy.com")) return "reamaze.test-godaddy.com";
	return "reamaze.godaddy.com";
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(/.*/, async (req, res) => {
	const formName = "contact-us";
	const body = req.body;
	const visitorIp = getVisitorIp(req);

	if (body?._gotcha) {
		console.warn("[contact] honeypot triggered", { ip: visitorIp });
		res.status(200).json({ success: true });
		return;
	}

	const email = body?.user?.email;
	if (!email) {
		res.status(400).json({ success: false, error: "user.email is required" });
		return;
	}

	const messageBody = body?.conversation?.messages_attributes?.[0]?.body;
	if (!messageBody) {
		res.status(400).json({
			success: false,
			error: "conversation message body is required",
		});
		return;
	}

	const config = loadContactConfig();
	if (!config?.forms) {
		res.status(500).json({ success: false, error: "Contact form not configured" });
		return;
	}

	const formConfig = Object.hasOwn(config.forms, formName)
		? config.forms[formName]
		: undefined;
	if (!formConfig) {
		res.status(404).json({
			success: false,
			error: `Form "${formName}" not configured`,
		});
		return;
	}

	if (isRateLimited(visitorIp)) {
		console.warn("[contact] rate limit hit", { ip: visitorIp });
		res.status(429).json({ success: false, error: "Too many requests" });
		return;
	}

	const payload = {
		conversation: {
			message: { body: messageBody },
			category_id: formConfig.categoryId,
			user: body.user,
			data: {
				__gd_contact_form_title: formName,
				...body.conversation?.data,
				__gd_type: "contact",
				...(formConfig.overrideEmail && {
					__gd_override_email: formConfig.overrideEmail,
				}),
			},
		},
	};
	const url = `https://${formConfig.brandId}.${resolveInboxHost()}/api/v2/contact`;
	const isHttpCheck = req.headers["x-airo-httpcheck"] === "true";

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Airo-Contact-Form": "true",
				"X-Forwarded-For": visitorIp,
				...(isHttpCheck && { "X-Airo-HttpCheck": "true" }),
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const responseText = await response.text().catch(() => "");
			console.error(`[contact] inbox backend ${response.status}:`, responseText.slice(0, 500));
			res.status(502).json({
				success: false,
				error: "Failed to submit contact form",
			});
			return;
		}

		res.status(200).json({ success: true });
	} catch (error) {
		console.error("[contact] fetch error:", error instanceof Error ? error.message : String(error));
		res.status(502).json({
			success: false,
			error: "Failed to submit contact form",
		});
	}
});

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
	console.error("vercel.contact.error", {
		error: error instanceof Error ? error.stack : String(error),
	});
	res.status(500).json({ success: false, error: "Internal server error" });
};

app.use(errorHandler);

export default app;
