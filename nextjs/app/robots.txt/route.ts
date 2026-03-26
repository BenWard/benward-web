export function GET() {
  const content = `User-Agent: *
# Don't index tag index pages. Duplicates date archives/articles
Disallow: /blog/tags/*
Disallow: /blog/categories/*
Disallow: /tags/*
Disallow: /res
Disallow: /media
Disallow: /files
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
