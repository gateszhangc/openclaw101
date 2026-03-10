export type StaticImageAsset = {
  path: string;
  width: number;
  height: number;
};

export const SITE_LOGO_ASSET: StaticImageAsset = {
  path: "/android-chrome-192x192.png",
  width: 192,
  height: 192,
};

export const DEFAULT_OPEN_GRAPH_ASSET: StaticImageAsset = {
  path: "/social/og-image.png",
  width: 1200,
  height: 630,
};

export const DEFAULT_TWITTER_ASSET: StaticImageAsset = {
  path: "/social/twitter-image.png",
  width: 1200,
  height: 675,
};

const GUIDE_COVER_ASSETS: Record<string, StaticImageAsset> = {
  "01-what-is-openclaw": {
    path: "/guides/covers/01-what-is-openclaw.jpg",
    width: 1600,
    height: 896,
  },
  "02-install-and-dashboard": {
    path: "/guides/covers/02-install-and-dashboard.jpg",
    width: 1600,
    height: 896,
  },
  "03-models-and-auth": {
    path: "/guides/covers/03-models-and-auth.jpg",
    width: 1600,
    height: 896,
  },
  "04-telegram-and-channels": {
    path: "/guides/covers/04-telegram-and-channels.jpg",
    width: 1600,
    height: 896,
  },
  "05-soul-and-memory": {
    path: "/guides/covers/05-soul-and-memory.jpg",
    width: 1600,
    height: 896,
  },
  "06-skills-and-automation": {
    path: "/guides/covers/06-skills-and-automation.jpg",
    width: 1600,
    height: 896,
  },
};

export function getGuideCoverAsset(slug: string): StaticImageAsset {
  return GUIDE_COVER_ASSETS[slug] || DEFAULT_OPEN_GRAPH_ASSET;
}
