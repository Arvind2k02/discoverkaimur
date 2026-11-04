import { afterEach, describe, expect, it, vi } from "vitest";
import type { Server } from "node:http";
import contactFunction from "../../api/contact/contact-us";
import { GET as getHealth } from "../../api/health";
import { GET as getLlms } from "../../api/llms";
import { GET as getRobots } from "../../api/robots";
import { GET as getSitemap } from "../../api/sitemap";

afterEach(() => {
	vi.unstubAllEnvs();
	vi.unstubAllGlobals();
});

describe("Vercel SEO functions", () => {
	it("allows indexing and publishes the sitemap on production domains", async () => {
		vi.stubEnv("VERCEL_ENV", "production");

		const robots = getRobots(new Request("https://kaimur.example/robots.txt"));
		const sitemap = getSitemap(new Request("https://kaimur.example/sitemap.xml"));
		const robotsText = await robots.text();
		const sitemapText = await sitemap.text();

		expect(robotsText).toContain("Allow: /");
		expect(robotsText).toContain("https://kaimur.example/sitemap.xml");
		expect(sitemapText).toContain("<loc>https://kaimur.example/</loc>");
		expect(sitemapText).toContain("<loc>https://kaimur.example/roadmap</loc>");
	});

	it("blocks indexing on preview deployments", async () => {
		vi.stubEnv("VERCEL_ENV", "preview");

		const robots = getRobots(new Request("https://kaimur-preview.vercel.app/robots.txt"));
		const sitemap = getSitemap(
			new Request("https://kaimur-preview.vercel.app/sitemap.xml"),
		);
		const llms = getLlms(new Request("https://kaimur-preview.vercel.app/llms.txt"));

		expect(await robots.text()).toContain("Disallow: /");
		expect(await sitemap.text()).not.toContain("<loc>");
		expect(llms.status).toBe(404);
	});

	it("serves the llms page list and health status", async () => {
		vi.stubEnv("VERCEL_ENV", "production");

		const llms = getLlms(new Request("https://kaimur.example/llms.txt"));
		const health = getHealth();

		expect(await llms.text()).toContain(
			"[Roadmap](https://kaimur.example/roadmap)",
		);
		expect(health.status).toBe(200);
		expect(await health.json()).toMatchObject({ status: "ok" });
	});
});

describe("Vercel contact function", () => {
	it("routes contact requests through the existing validation handler", async () => {
		const server = await new Promise<Server>((resolve) => {
			const listening = contactFunction.listen(0, "127.0.0.1", () => resolve(listening));
		});

		try {
			const address = server.address();
			if (!address || typeof address === "string") {
				throw new Error("Expected TCP listener");
			}

			const response = await fetch(
				`http://127.0.0.1:${address.port}/api/contact/contact-us`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({}),
				},
			);

			expect(response.status).toBe(400);
			expect(await response.json()).toMatchObject({
				success: false,
				error: "user.email is required",
			});
		} finally {
			await new Promise<void>((resolve, reject) => {
				server.close((error) => (error ? reject(error) : resolve()));
			});
		}
	});

	it("loads included form configuration and forwards a valid submission", async () => {
		const nativeFetch = globalThis.fetch;
		const fetchMock = vi.fn<typeof fetch>(async (input, init) => {
			if (String(input).startsWith("https://fb3f0b42-79d1-41d8-9657-dabc67ea4146.")) {
				return Response.json({ success: true });
			}
			return nativeFetch(input, init);
		});
		vi.stubGlobal("fetch", fetchMock);

		const server = await new Promise<Server>((resolve) => {
			const listening = contactFunction.listen(0, "127.0.0.1", () => resolve(listening));
		});

		try {
			const address = server.address();
			if (!address || typeof address === "string") {
				throw new Error("Expected TCP listener");
			}

			const response = await fetch(
				`http://127.0.0.1:${address.port}/api/contact/contact-us`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						conversation: { messages_attributes: [{ body: "Test message" }] },
						user: { email: "test@example.com", name: "Test Visitor" },
					}),
				},
			);

			expect(response.status).toBe(200);
			expect(await response.json()).toEqual({ success: true });
			const downstreamCalls = fetchMock.mock.calls.filter(([input]) =>
				String(input).startsWith("https://fb3f0b42-79d1-41d8-9657-dabc67ea4146."),
			);
			expect(downstreamCalls).toHaveLength(1);
			expect(downstreamCalls[0]?.[0]).toBe(
				"https://fb3f0b42-79d1-41d8-9657-dabc67ea4146.reamaze.godaddy.com/api/v2/contact",
			);
			expect(JSON.parse(String(downstreamCalls[0]?.[1]?.body))).toMatchObject({
				conversation: {
					category_id: 85416867,
					message: { body: "Test message" },
				},
			});
		} finally {
			await new Promise<void>((resolve, reject) => {
				server.close((error) => (error ? reject(error) : resolve()));
			});
		}
	});
});
