import { ContentTab, ContentTabsNames } from "./content.types";

export const contentTabs: ContentTab = {
  [ContentTabsNames.POSTS]: <div>posts</div>,
  [ContentTabsNames.ABOUT]: <div>about</div>,
  [ContentTabsNames.POINTS_OF_INTEREST]: <div>points of interest</div>,
  [ContentTabsNames.MAP]: <div>map</div>,
};

export const tabsHeadersMap: Record<ContentTabsNames, string> = {
  [ContentTabsNames.POSTS]: "Publicações",
  [ContentTabsNames.ABOUT]: "Sobre",
  [ContentTabsNames.POINTS_OF_INTEREST]: "Pontos de interesse",
  [ContentTabsNames.MAP]: "Mapa",
};

export function getActiveContentTab(value: string | null): ContentTabsNames {
  if (!value) return ContentTabsNames.POSTS;
  const valueIsUnknown = !Object.keys(tabsHeadersMap).includes(value);

  if (valueIsUnknown) return ContentTabsNames.POSTS;
  return value as ContentTabsNames;
}
