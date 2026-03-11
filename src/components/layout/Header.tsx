"use client";

import { useEffect, useState } from "react";
import { ActionIcon, Box, Group, Select, Text } from "@mantine/core";
import { useComputedColorScheme } from "@mantine/core";
import Link from "next/link";
import { usePreferencesStore } from "@/store/preferences.store";

type ApiChoice = "go" | "python" | "java";

interface HeaderProps {
  initialApi: ApiChoice;
}

export function Header({ initialApi }: HeaderProps) {
  const [api, setApiState] = useState<ApiChoice>(initialApi);
  const setApi = usePreferencesStore((state) => state.setApi);
  const setColorScheme = usePreferencesStore((state) => state.setColorScheme);

  useEffect(() => {
    usePreferencesStore.getState().hydrate({ 
      api: initialApi, 
      colorScheme: usePreferencesStore.getState().colorScheme 
    });
  }, [initialApi]);

  const handleApiChange = (value: string | null) => {
    if (value && (value === "go" || value === "python" || value === "java")) {
      setApiState(value);
      setApi(value);
    }
  };
  const computedColorScheme = useComputedColorScheme("light");

  const toggleTheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  const isDark = computedColorScheme === "dark";

  return (
    <Box
      component="header"
      bg={isDark ? "rgba(20, 20, 20, 0.7)" : "rgba(200, 200, 200, 0.5)"}
      c={isDark ? "white" : "black"}
      px="md"
      py="sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: isDark
          ? "1px solid rgba(0, 0, 0, 0.5)"
          : "1px solid rgba(200, 200, 200, 0.5)",
        backdropFilter: "blur(16px) saturate(140%)",
      }}
    >
      <Group justify="space-between">
        <Link href="/">
          <Text
            component="span"
            fw={900}
            fz="xl"
            style={{ letterSpacing: "-0.05em" }}
          >
            🐈 CatGallery
          </Text>
        </Link>

        <Group gap="xs">
          <Select
            size="xs"
            w={120}
            data={[
              { value: "go", label: "API Go" },
              { value: "java", label: "API Java" },
              { value: "python", label: "API Python" },
            ]}
            value={api}
            onChange={handleApiChange}
            visibleFrom="sm"
            aria-label="API para guardar favoritos"
          />
          <Text size="sm" visibleFrom="sm">
            Next.js 16 · Mantine
          </Text>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
            }
          >
            {isDark ? "☀️" : "🌙"}
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
}
