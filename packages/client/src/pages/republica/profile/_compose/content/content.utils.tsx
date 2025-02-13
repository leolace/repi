import { ContentTabs, ITab } from "./content.types";

export const tabs: Record<ContentTabs, ITab> = {
  [ContentTabs.ABOUT]: {
    label: "Sobre",
    content: <div>about</div>,
  },
  // [ContentTabs.POSTS]: {
  //   label: "Publicações",
  //   content: <div>posts</div>,
  // },
  // [ContentTabs.POINTS_OF_INTEREST]: {
  //   label: "Pontos de interesse",
  //   content: <div>points of interest</div>,
  // },
  // [ContentTabs.MAP]: {
  //   label: "Mapa",
  //   content: <div>map</div>,
  // },
};

export function getActiveContentTab(value: string | null): ContentTabs {
  if (!value) return ContentTabs.ABOUT;
  const valueIsUnknown = !Object.keys(tabs).includes(value);

  if (valueIsUnknown) return ContentTabs.ABOUT;
  return value as ContentTabs;
}
