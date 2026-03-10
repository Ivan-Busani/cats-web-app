"use client";

import { Box, Text } from "@mantine/core";
import { useComputedColorScheme } from "@mantine/core";

export function Footer() {
  const computedColorScheme = useComputedColorScheme("light");

  const isDark = computedColorScheme === "dark";

  return (
    <Box
      component="footer"
      bg={isDark ? "rgba(20, 20, 20, 0.7)" : "rgba(200, 200, 200, 0.5)"}
      c={isDark ? "white" : "black"}
      px="md"
      py="sm"
      style={{ 
        position: "sticky", 
        bottom: 0, 
        zIndex: 50, 
        borderBottom: isDark ? 
          "1px solid rgba(0, 0, 0, 0.5)" 
          : "1px solid rgba(200, 200, 200, 0.5)",
        backdropFilter: "blur(16px) saturate(140%)"
      }}
    >
      <Text size="sm" ta="center">
        © {new Date().getFullYear()} CatGallery
      </Text>
    </Box>
  );
}
