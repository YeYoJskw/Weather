import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  city: string;
  setCity: (newCity: string) => void;
}

export const useCityStore = create<StoreState>()(
  persist(
    (set) => ({
      city: 'Bishkek',
      setCity: (newCity: string) => set({ city: newCity }),
    }),
    {
      name: 'city-storage',
    }
  )
);
