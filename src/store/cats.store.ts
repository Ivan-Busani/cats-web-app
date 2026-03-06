import { create } from 'zustand';
import { CatImage } from '@/types/cat';

interface CatStore {
  cats: CatImage[];
  setCats: (cats: CatImage[]) => void;
  addMoreCats: (newCats: CatImage[]) => void;
}

export const useCatStore = create<CatStore>((set) => ({
  cats: [],
  setCats: (cats) => set({ cats }), 
  addMoreCats: (newCats) => set((state) => ({ cats: [...state.cats, ...newCats] })),
}));