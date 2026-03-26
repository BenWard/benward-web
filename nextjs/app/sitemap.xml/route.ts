import { siteConfig } from "@/config/site";

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.google.com/schemas/sitemap/0.84">
	<url>
		<loc>${siteConfig.url}</loc>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
	<url>
		<loc>${siteConfig.url}/about</loc>
		<changefreq>monthly</changefreq>
		<priority>0.8</priority>
	</url>
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
