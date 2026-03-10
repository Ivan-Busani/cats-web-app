"use client";

import {
  MantineProvider,
  createTheme,
  type MantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { cookieColorSchemeManager } from "@/lib/cookie-color-scheme";

type ProvidersProps = {
  children: React.ReactNode;
  defaultColorScheme?: "light" | "dark" | "auto";
};

const theme = createTheme({
  components: {
    Modal: {
      styles: (theme: MantineTheme) => {
        const { colorScheme } = useMantineColorScheme();
        const isDark = colorScheme === "dark";

        const glassBg = isDark
          ? "rgba(15, 23, 42, 0.85)"
          : "rgba(255, 255, 255, 0.9)";
        const borderColor = isDark
          ? "rgba(148, 163, 184, 0.6)"
          : "rgba(148, 163, 184, 0.7)";
        const hoverCloseBg = isDark
          ? "rgba(148, 163, 184, 0.35)"
          : "rgba(148, 163, 184, 0.25)";

        return {
          content: {
            backgroundColor: glassBg,
            borderRadius: theme.radius.xl,
            border: `1px solid ${borderColor}`,
            boxShadow: theme.shadows.xl,
            backdropFilter: "blur(16px) saturate(140%)",
            paddingTop: theme.spacing.sm,
          },
          header: {
            backgroundColor: "transparent",
            borderBottom: "none",
          },
          body: {
            paddingTop: 0,
          },
          title: {
            fontWeight: 700,
          },
          close: {
            "&:hover": {
              backgroundColor: hoverCloseBg,
            },
          },
        };
      },
    },
  },
});

export function Providers({ children, defaultColorScheme = "light" }: ProvidersProps) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme={defaultColorScheme}
      colorSchemeManager={cookieColorSchemeManager()}
    >
      {children}
    </MantineProvider>
  );
}