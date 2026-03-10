import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@mantine/core/styles.css";
import "./globals.css";
import { mantineHtmlProps } from "@mantine/core";
import { CookieColorSchemeScript } from "@/lib/cookie-color-scheme";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Box, Stack, Text } from "@mantine/core";

const THEME_COOKIE = "mantine-color-scheme";

export const metadata: Metadata = {
  title: "CatGallery",
  description: "Galería de gatos construida con Next.js",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE)?.value;
  const initialColorScheme =
    themeCookie === "light" || themeCookie === "dark" || themeCookie === "auto"
      ? themeCookie
      : "light";

  return (
    <html lang="es" {...mantineHtmlProps}>
      <head>
        <CookieColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <Providers defaultColorScheme={initialColorScheme}>
          <Stack mih="100vh" gap={0}>
            <Header />

            <Box
              component="main"
              flex={1}
            >
              {children}
              {modal}
            </Box>

            <Box
              component="footer"
              py="sm"
              ta="center"
            >
              <Text size="sm">
                © {new Date().getFullYear()} CatGallery
              </Text>
            </Box>
          </Stack>
        </Providers>
      </body>
    </html>
  );
}