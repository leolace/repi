export enum ContentTabsNames {
  ABOUT = "sobre",
  POSTS = "publicacoes",
//   MAP = "mapa",
//   POINTS_OF_INTEREST = "pontos-de-interesse",
}

export type ContentTab = Record<ContentTabsNames, React.ReactNode>;
