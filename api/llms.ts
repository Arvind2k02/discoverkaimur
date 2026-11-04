import { seoRoutes } from "../src/lib/seo-routes";
import { siteMeta } from "../src/lib/site-meta";
import { renderLlmsTxt } from "../src/server/llms-txt";
import { isVercelSystemHost, textResponse } from "../src/server/vercel-seo";

export function GET(request: Request): Response {
	const url = new URL(request.url);
	if (isVercelSystemHost(url.hostname)) {
		return new Response("Not found\n", {
			status: 404,
			headers: {
				"Cache-Control": "public, max-age=60, must-revalidate",
				"Content-Type": "text/plain; charset=utf-8",
				Vary: "Host",
			},
		});
	}

	return textResponse(
		renderLlmsTxt({
			baseUrl: url.origin,
			hostname: url.hostname,
			name: siteMeta.name,
			summary: siteMeta.summary,
			routes: seoRoutes,
		}),
		"text/plain; charset=utf-8",
	);
}
