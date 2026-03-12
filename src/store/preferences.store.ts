import { create } from "zustand";
import {
  getPreferences,
  setPreferences,
  type ApiChoice,
  type ColorScheme,
} from "@/lib/preferences-cookies";

function getInitialState(): { api: ApiChoice; colorScheme: ColorScheme } {
  if (typeof document !== "undefined") {
    const api = document.documentElement.getAttribute("data-initial-api");
    const colorScheme = document.documentElement.getAttribute(
      "data-initial-color-scheme"
    );
    if (
      (api === "go" || api === "python" || api === "java" || api === "nodejs") &&
      (colorScheme === "light" || colorScheme === "dark" || colorScheme === "auto")
    ) {
      return { api, colorScheme };
    }
  }
  return { api: "go", colorScheme: "light" };
}

interface PreferencesStore {
  api: ApiChoice;
  colorScheme: ColorScheme;
  setApi: (api: ApiChoice) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
  hydrate: (prefs: { api: ApiChoice; colorScheme: ColorScheme }) => void;
}

const initialState = getInitialState();

export const usePreferencesStore = create<PreferencesStore>((set) => ({
  api: initialState.api,
  colorScheme: initialState.colorScheme,
  setApi: (api) => {
    set({ api });
    setPreferences({ api });
  },
  setColorScheme: (colorScheme) => {
    set({ colorScheme });
    setPreferences({ colorScheme });
  },
  hydrate: (prefs) => set(prefs),
}));
