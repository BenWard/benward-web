interface ArticleLayoutProps {
  content: string;
}

export function ArticleLayout({ content }: ArticleLayoutProps) {
  return <article dangerouslySetInnerHTML={{ __html: content }} />;
}
