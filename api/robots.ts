import { isVercelSystemHost, textResponse } from "../src/server/vercel-seo";

export function GET(request: Request): Response {
	const url = new URL(request.url);
	if (isVercelSystemHost(url.hostname)) {
		return textResponse("User-agent: *\nDisallow: /\n", "text/plain; charset=utf-8");
	}

	return textResponse(
		`User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.xml\n`,
		"text/plain; charset=utf-8",
	);
}
