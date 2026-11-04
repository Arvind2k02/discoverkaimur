import { isSystemHost } from "./seo-host";

export function isVercelSystemHost(hostname: string): boolean {
	return (
		isSystemHost({ hostname }) ||
		(process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production")
	);
}

export function textResponse(body: string, contentType: string): Response {
	return new Response(body, {
		headers: {
			"Cache-Control": "public, max-age=60, must-revalidate",
			"Content-Type": contentType,
			Vary: "Host",
		},
	});
}
