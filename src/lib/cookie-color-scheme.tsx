import type { MantineColorScheme, MantineColorSchemeManager } from "@mantine/core";
import { PREFERENCES_COOKIE } from "./preferences-cookies";

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

function getColorSchemeFromPreferences(): MantineColorScheme | null {
  const raw = getCookie(PREFERENCES_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { colorScheme?: string };
    const scheme = parsed?.colorScheme ?? null;
    return isMantineColorScheme(scheme) ? scheme : null;
  } catch {
    return null;
  }
}

function setColorSchemeInPreferences(value: MantineColorScheme) {
  const raw = getCookie(PREFERENCES_COOKIE);
  let parsed: Record<string, unknown> = {};
  if (raw) {
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      // ignore
    }
  }
  parsed.colorScheme = value;
  setCookie(
    PREFERENCES_COOKIE,
    JSON.stringify(parsed),
    COOKIE_MAX_AGE
  );
}

export function cookieColorSchemeManager(): MantineColorSchemeManager {
  return {
    get: (defaultValue) => {
      const stored = getColorSchemeFromPreferences();
      return isMantineColorScheme(stored) ? stored : defaultValue;
    },
    set: (value) => {
      setColorSchemeInPreferences(value);
    },
    subscribe: () => {},
    unsubscribe: () => {},
    clear: () => {
      setColorSchemeInPreferences("light");
    },
  };
}

export interface CookieColorSchemeScriptProps {
  defaultColorScheme?: MantineColorScheme;
}

/**
 * Reads colorScheme from cats-preferences cookie for initial HTML attribute.
 */
export function CookieColorSchemeScript({
  defaultColorScheme = "light",
}: CookieColorSchemeScriptProps) {
  const script = `
(function() {
  try {
    var match = document.cookie.match(new RegExp("(^| )" + "${PREFERENCES_COOKIE}" + "=([^;]+)"));
    var stored = match ? decodeURIComponent(match[2]) : null;
    var colorScheme = "${defaultColorScheme}";
    if (stored) {
      try {
        var parsed = JSON.parse(stored);
        if (parsed.colorScheme === "light" || parsed.colorScheme === "dark" || parsed.colorScheme === "auto") {
          colorScheme = parsed.colorScheme;
        }
      } catch (e) {}
    }
    var computed = colorScheme !== "auto" ? colorScheme : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-mantine-color-scheme", computed);
  } catch (e) {}
})();
  `.trim();

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
