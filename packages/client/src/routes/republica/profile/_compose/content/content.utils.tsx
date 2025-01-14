import { ContentTabContent, ContentTabLabels, ContentTabs } from "./content.types";

export const tabContents: ContentTabContent = {
  [ContentTabs.ABOUT]: <div>about</div>,
  // [ContentTabsNames.POSTS]: <div>posts</div>,
  // [ContentTabsNames.POINTS_OF_INTEREST]: <div>points of interest</div>,
  // [ContentTabsNames.MAP]: <div>map</div>,
};

export const tabLabels: ContentTabLabels = {
  [ContentTabs.ABOUT]: "Sobre",
  // [ContentTabsNames.POSTS]: "Publicações",
  // [ContentTabsNames.POINTS_OF_INTEREST]: "Pontos de interesse",
  // [ContentTabsNames.MAP]: "Mapa",
};

export function getActiveContentTab(value: string | null): ContentTabs {
  if (!value) return ContentTabs.ABOUT;
  const valueIsUnknown = !Object.keys(tabLabels).includes(value);

  if (valueIsUnknown) return ContentTabs.ABOUT;
  return value as ContentTabs;
}
