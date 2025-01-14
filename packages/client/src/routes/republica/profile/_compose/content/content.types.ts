export enum ContentTabs {
  ABOUT = "sobre",
  // POSTS = "publicacoes",
  // MAP = "mapa",
  // POINTS_OF_INTEREST = "pontos-de-interesse",
}

export type ContentTabContent = Record<ContentTabs, React.ReactNode>;
export type ContentTabLabels = Record<ContentTabs, string>;
