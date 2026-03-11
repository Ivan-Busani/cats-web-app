"use client";

import { useRef } from "react";
import { usePreferencesStore } from "@/store/preferences.store";

interface PreferencesHydratorProps {
  children: React.ReactNode;
  initialApi: "go" | "python" | "java";
  initialColorScheme: "light" | "dark" | "auto";
}

/**
 * Hydrates preferences store with server-side values to avoid flash on load.
 */
export function PreferencesHydrator({
  children,
  initialApi,
  initialColorScheme,
}: PreferencesHydratorProps) {
  const hydrated = useRef(false);
  if (!hydrated.current) {
    usePreferencesStore.getState().hydrate({
      api: initialApi,
      colorScheme: initialColorScheme,
    });
    hydrated.current = true;
  }

  return <>{children}</>;
}
