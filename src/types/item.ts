export type ItemType = 'Álbum' | 'EP' | 'Mixtape' | 'Single' | 'Remix' | 'Compilação';

export const ITEM_TYPES: ItemType[] = ['Álbum', 'EP', 'Mixtape', 'Single', 'Remix', 'Compilação'];

export const FIXED_LISTS = [
  'Em Rotação',
  'Recomendações',
  'Lançamentos Recentes',
  'Lista de Desejos',
  'Ouvidos',
] as const;

export type FixedList = (typeof FIXED_LISTS)[number];

export interface IItem {
  id: string;
  title: string;
  artists: string[];
  type: ItemType;
  coverUrl?: string;
  recommendedBy?: string[];
  isGeneratedRecommendation?: boolean;
  genres: string[];
  tags: string[];
  lists: string[];
}

export interface FilterState {
  tags: string[];
  genres: string[];
  artists: string[];
  types: string[];
  lists: string[];
  recommendedBy: string[];
  title: string;
}

export const EMPTY_FILTERS: FilterState = {
  tags: [],
  genres: [],
  artists: [],
  types: [],
  lists: [],
  recommendedBy: [],
  title: '',
};
