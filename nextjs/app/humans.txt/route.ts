import { toXmlSchema } from "@/lib/dates";

export const dynamic = "force-dynamic";

export function GET() {
  const content = `/* TEAM */
  Protagonist: Ben Ward
  URL: https://benward.uk/about
  Twitter: @benward
  From: Cambridge, United Kingdom

/* SITE */
  Last update: ${toXmlSchema(new Date())}
  Language: English (British)
  Doctype: HTML5
  IDE: Nova, Visual Studio Code, Sublime Text, iA Writer
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
