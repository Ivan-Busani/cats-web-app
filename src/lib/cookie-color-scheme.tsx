import type { MantineColorScheme, MantineColorSchemeManager } from "@mantine/core";

const COOKIE_KEY = "mantine-color-scheme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function isMantineColorScheme(value: string | null): value is MantineColorScheme {
  return value === "light" || value === "dark" || value === "auto";
}

export function cookieColorSchemeManager(): MantineColorSchemeManager {
  return {
    get: (defaultValue) => {
      const stored = getCookie(COOKIE_KEY);
      return isMantineColorScheme(stored) ? stored : defaultValue;
    },
    set: (value) => {
      setCookie(COOKIE_KEY, value, COOKIE_MAX_AGE);
    },
    subscribe: () => {},
    unsubscribe: () => {},
    clear: () => {
      setCookie(COOKIE_KEY, "", 0);
    },
  };
}

export interface CookieColorSchemeScriptProps {
  defaultColorScheme?: MantineColorScheme;
  cookieKey?: string;
}

/**
 * Replaces ColorSchemeScript to read from cookies instead of localStorage.
 * Must match cookieKey with cookieColorSchemeManager.
 */
export function CookieColorSchemeScript({
  defaultColorScheme = "light",
  cookieKey = COOKIE_KEY,
}: CookieColorSchemeScriptProps) {
  const script = `
(function() {
  try {
    var match = document.cookie.match(new RegExp("(^| )" + "${cookieKey}" + "=([^;]+)"));
    var stored = match ? decodeURIComponent(match[2]) : null;
    var colorScheme = (stored === "light" || stored === "dark" || stored === "auto") ? stored : "${defaultColorScheme}";
    var computed = colorScheme !== "auto" ? colorScheme : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-mantine-color-scheme", computed);
  } catch (e) {}
})();
  `.trim();

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
