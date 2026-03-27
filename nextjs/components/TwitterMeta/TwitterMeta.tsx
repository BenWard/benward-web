import { siteConfig } from "@/config/site";

interface TwitterMetaProps {
  title?: string;
}

export function TwitterMeta({ title }: TwitterMetaProps) {
  const displayTitle = title || siteConfig.title;
  return (
    <>
      <meta name="twitter:widgets:link-color" content="#a32226" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={displayTitle} />
      <meta
        name="twitter:description"
        content="benward.uk is the personal web site and blog of Ben Ward."
      />
      <meta name="twitter:creator:id" content={siteConfig.author.twitterId} />
    </>
  );
}
