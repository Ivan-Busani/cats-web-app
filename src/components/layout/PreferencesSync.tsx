"use client";

import { useEffect } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { usePreferencesStore } from "@/store/preferences.store";

/**
 * Syncs preferences store colorScheme changes to Mantine.
 * Must be rendered inside MantineProvider.
 */
export function PreferencesSync() {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = usePreferencesStore((state) => state.colorScheme);

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme, setColorScheme]);

  return null;
}
