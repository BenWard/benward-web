import { siteConfig } from "@/config/site";
import { shortlink } from "@/lib/base60";
import styles from "./Share.module.css";

interface ShareProps {
  cleanUrl: string;
  globalDate: string;
  githubSourceUrl: string;
}

export function Share({ cleanUrl, globalDate, githubSourceUrl }: ShareProps) {
  const permalink = `${siteConfig.url}${cleanUrl}`;
  const shortUrl = shortlink(globalDate, siteConfig.shortdomain);

  return (
    <>
      <div id="respond" className={styles.links}>
        <h2>Links</h2>
        <p>
          To share this entry, or reference it in commentary of your own, link
          to the following:
        </p>
        <ul>
          <li>
            Permalink:{" "}
            <a rel="canonical nofollow" href={permalink}>
              {permalink}
            </a>
          </li>
          <li>
            Shortlink:{" "}
            <a rel="shortlink nofollow" href={shortUrl}>
              {shortUrl}
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.followUp}>
        <p className="github">
          You can file issues or provide corrections:{" "}
          <a
            className="button"
            title="View source for this post"
            href={githubSourceUrl}
          >
            View Source on Github
          </a>
          .{" "}
          <a href="https://github.com/BenWard/benward/graphs/contributors">
            Contributor credits.
          </a>
        </p>
      </div>
    </>
  );
}
