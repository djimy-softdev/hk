export const TT = 1;

export interface Property {
  id: string;
  title: string;
  thumbnailUrl: string;
  rentAmount: number;
  rentCurrencyName: string;
  rentCurrencyCode: string;
  mrt: string;
  bedrooms: number;
  addressCity: string;
  addressDist: string;
  addressRoad: string;
  isFavorite?: boolean;
}

export interface PropertyList {
  metadata: {
    total: number;
    totalPages: number;
    page: number;
    perPage: number;
  };
  data: Property[];
}

export interface PropertyListFilter {
  city?: string;
  district?: string;
  mrt?: string;
  rooms?: string;
  rent?: string;
  page?: string;
}

type City = string;
type District = string;

export interface PropertyFilterConfig {
  locations: Record<City, District[]>;
}

export enum ToggleFavBtnAction {
  ADD = 'create',
  REMOVE = 'delete',
}
