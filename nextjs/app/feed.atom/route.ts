import { loadAllPostsSync, renderPost } from "@/lib/content";
import { enrichPost } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { shortlink } from "@/lib/base60";
import { generateTagId } from "@/lib/tag-id";
import { formatISO, toXmlSchema } from "@/lib/dates";

export const dynamic = "force-dynamic";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const allPosts = loadAllPostsSync().map(enrichPost);
  const recentPosts = allPosts.slice(0, 20);

  // Render all posts
  const renderedPosts = await Promise.all(
    recentPosts.map(async (post) => {
      const rendered = await renderPost(post);
      return { ...post, content: rendered.content };
    })
  );

  const entries = renderedPosts
    .map((post) => {
      const id = post.frontmatter.atomid || generateTagId(post.globalDate, post.cleanUrl);
      const url = post.frontmatter.canonical || `${siteConfig.url}${post.cleanUrl}`;
      const shortUrl = shortlink(post.globalDate, siteConfig.shortdomain);
      const isoDate = formatISO(post.globalDate);

      let dateElements: string;
      if (post.frontmatter.updated) {
        dateElements = `  <published>${isoDate}</published>\n   <updated>${formatISO(post.frontmatter.updated)}</updated>`;
      } else {
        dateElements = `  <updated>${isoDate}</updated>`;
      }

      const summary = post.excerpt
        ? `\n   <summary type="html">${escapeXml(post.excerpt)}</summary>`
        : "";

      return ` <entry>
   <id>${escapeXml(id)}</id>
   <title>${escapeXml(post.frontmatter.title || "")}</title>
   <link href="${escapeXml(url)}"/>
   <link rel="shortlink" href="${escapeXml(shortUrl)}"/>
   ${dateElements}${summary}
   <content type="html">${escapeXml(post.content)}</content>
 </entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
 <title>${siteConfig.title}</title>
 <link href="${siteConfig.url}/feed.atom" rel="self"/>
 <link href="${siteConfig.url}"/>
 <updated>${toXmlSchema(new Date())}</updated>
 <id>${siteConfig.url}</id>
 <author>
   <name>${siteConfig.author.name}</name>
   <uri>${siteConfig.author.url}</uri>
 </author>
${entries}
</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
