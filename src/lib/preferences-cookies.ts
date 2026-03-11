export type ApiChoice = "go" | "python" | "java";
export type ColorScheme = "light" | "dark" | "auto";

export const API_LABELS: Record<ApiChoice, string> = {
  go: "API Go",
  python: "API Python",
  java: "API Java",
};

export interface UserPreferences {
  colorScheme: ColorScheme;
  api: ApiChoice;
}

export const PREFERENCES_COOKIE = "cats-preferences";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const DEFAULT_PREFERENCES: UserPreferences = {
  colorScheme: "light",
  api: "go",
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function isValidColorScheme(value: string): value is ColorScheme {
  return value === "light" || value === "dark" || value === "auto";
}

function isValidApi(value: string): value is ApiChoice {
  return value === "go" || value === "python" || value === "java";
}

export function getPreferences(): UserPreferences {
  const raw = getCookie(PREFERENCES_COOKIE);
  if (!raw) return { ...DEFAULT_PREFERENCES };
  try {
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    const colorScheme = isValidColorScheme(parsed?.colorScheme ?? "")
      ? (parsed.colorScheme as ColorScheme)
      : DEFAULT_PREFERENCES.colorScheme;
    const api = isValidApi(parsed?.api ?? "")
      ? (parsed.api as ApiChoice)
      : DEFAULT_PREFERENCES.api;
    return { colorScheme, api };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function setPreferences(prefs: Partial<UserPreferences>) {
  const current = getPreferences();
  const next = { ...current, ...prefs };
  setCookie(PREFERENCES_COOKIE, JSON.stringify(next), COOKIE_MAX_AGE);
}
