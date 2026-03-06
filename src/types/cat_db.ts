export interface CatDB {
  id: number;
  cat_id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreedDB[];
  api_used?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CatBreedDB {
  id: string;
  name: string;
  temperament?: string;
  origin?: string;
  country_codes?: string;
  country_code?: string;
  life_span?: string;
  wikipedia_url?: string;
  weight?: {
    imperial: string;
    metric: string;
  };
}

export interface SaveCatPayload {
  cat_id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreedDB[];
}