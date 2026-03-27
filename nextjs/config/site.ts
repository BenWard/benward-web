export const siteConfig = {
  title: "Ben Ward",
  url: "https://benward.uk",
  shortdomain: "https://bnwrd.me",
  githubSlug: "BenWard/benward-web",
  gitBase: "jekyll",
  author: {
    name: "Ben Ward",
    url: "https://benward.uk",
    twitter: "benward",
    twitterId: "12249",
  },
  dateFormats: {
    iso: "yyyy-MM-dd'T'HH:mm:ssxxx",
    display: "MMM d yyyy, H:mm (xxx)",
    time: "H:mm (xxx)",
  },
  /** Domain switched in 2018 */
  domainCutoverDate: "2018-01-01",
  legacyDomain: "benward.me",
  currentDomain: "benward.uk",
  gaugesSiteId: "515a7c52108d7b061f000024",
} as const;
