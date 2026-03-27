import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { romanize } from "@/lib/romans";
import { Profiles } from "@/components/Profiles";
import { Identity } from "@/components/Identity";
import { Scripts } from "@/components/Scripts";
import "@/lib/global.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.title}`,
  },
  alternates: {
    types: {
      "application/atom+xml": "/feed.atom",
    },
  },
  icons: {
    shortcut: "/favicon.png",
  },
  other: {
    "twitter:widgets:link-color": "#a32226",
    "twitter:card": "summary",
    "twitter:description":
      "benward.uk is the personal web site and blog of Ben Ward.",
    "twitter:creator:id": siteConfig.author.twitterId,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="en-gb" id="uk-benward">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <Profiles />
        <Identity />
      </head>
      <body>
        <header className={styles.header}>
          <h1 className={styles.siteTitle}>
            <a rel="home" href="/">
              {siteConfig.title}
            </a>
          </h1>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <abbr title="Copyright">©</abbr>{" "}
          <abbr title={String(year)}>{romanize(year)}</abbr>{" "}
          <address className="h-card">
            <a
              className="p-name u-url"
              href="http://benward.uk"
              rel="me author"
            >
              Ben Ward
            </a>
          </address>{" "}
          All rights reserved
          <nav>
            <p>
              <a rel="me" href="/about">
                About
              </a>{" "}
              ·{" "}
              <a rel="me" href="/network">
                Social Media
              </a>{" "}
              ·{" "}
              <a href="/feeds">
                Feeds
              </a>{" "}
              ·{" "}
              <a href={`https://github.com/${siteConfig.githubSlug}`}>
                View Source
              </a>
            </p>
          </nav>
          <p className={styles.footnote}>
            Questions on this blog will be answered gladly if correct postage is
            enclosed.
          </p>
        </footer>
        <Scripts />
      </body>
    </html>
  );
}
