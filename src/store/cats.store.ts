import { create } from 'zustand';
import { CatImage } from '@/types/cat';
import { CatDB } from '@/types/cat_db';

interface CatStore {
  cats: CatImage[];
  favorites: CatDB[];
  setCats: (cats: CatImage[]) => void;
  addMoreCats: (newCats: CatImage[]) => void;
  setFavorites: (favorites: CatDB[]) => void;
  addFavorite: (favorite: CatDB) => void;
  removeFavorite: (favorite: CatDB) => void;
  removeFavoriteById: (id: number) => void;
}

export const useCatStore = create<CatStore>((set) => ({
  cats: [],
  setCats: (cats) => set({ cats }), 
  addMoreCats: (newCats) => set((state) => ({ cats: [...state.cats, ...newCats] })),
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
  addFavorite: (favorite) => set((state) => ({ favorites: [favorite, ...state.favorites] })),
  removeFavorite: (favorite) => set((state) => ({ favorites: state.favorites.filter((f) => f.id !== favorite.id) })),
  removeFavoriteById: (id) => set((state) => ({ favorites: state.favorites.filter((f) => f.id !== id) })),
}));