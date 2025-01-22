export enum ContentTabs {
  ABOUT = "sobre",
  // POSTS = "publicacoes",
  // MAP = "mapa",
  // POINTS_OF_INTEREST = "pontos-de-interesse",
}

export interface ITab {
  label: string;
  content: React.ReactNode;
}
