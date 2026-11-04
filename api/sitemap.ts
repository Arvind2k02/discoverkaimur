import { seoRoutes } from "../src/lib/seo-routes";
import { isVercelSystemHost, textResponse } from "../src/server/vercel-seo";

function escapeXml(value: string): string {
	return value.replace(/[&<>"']/g, (character) =>
		({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[
			character
		]!,
	);
}

export function GET(request: Request): Response {
	const url = new URL(request.url);
	if (isVercelSystemHost(url.hostname)) {
		return textResponse(
			'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>\n',
			"application/xml; charset=utf-8",
		);
	}

	const entries = seoRoutes
		.filter((route) => typeof route.path === "string" && route.path.startsWith("/"))
		.map((route) => {
			const fields = [`    <loc>${escapeXml(`${url.origin}${route.path}`)}</loc>`];
			if (route.lastmod) fields.push(`    <lastmod>${escapeXml(route.lastmod)}</lastmod>`);
			if (route.changefreq) fields.push(`    <changefreq>${route.changefreq}</changefreq>`);
			if (route.priority !== undefined) {
				fields.push(`    <priority>${route.priority.toFixed(1)}</priority>`);
			}
			return `  <url>\n${fields.join("\n")}\n  </url>`;
		})
		.join("\n");

	return textResponse(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
		"application/xml; charset=utf-8",
	);
}
