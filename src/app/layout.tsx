import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@mantine/core/styles.css";
import "./globals.css";
import { mantineHtmlProps } from "@mantine/core";
import { CookieColorSchemeScript } from "@/lib/cookie-color-scheme";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Box, Stack } from "@mantine/core";
import { PREFERENCES_COOKIE } from "@/lib/preferences-cookies";

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
  const prefsCookie = cookieStore.get(PREFERENCES_COOKIE)?.value;
  
  let initialColorScheme: "light" | "dark" | "auto" = "light";
  let initialApi: "go" | "python" | "java" | "nodejs" = "go";

  if (prefsCookie) {
    try {
      const parsed = JSON.parse(prefsCookie) as {
        colorScheme?: string;
        api?: string;
      };
      if (
        parsed.colorScheme === "light" ||
        parsed.colorScheme === "dark" ||
        parsed.colorScheme === "auto"
      ) {
        initialColorScheme = parsed.colorScheme;
      }
      if (
        parsed.api === "go" ||
        parsed.api === "python" ||
        parsed.api === "java" ||
        parsed.api === "nodejs"
      ) {
        initialApi = parsed.api;
      }
    } catch {
      // ignore
    }
  }

  return (
    <html
      lang="es"
      {...mantineHtmlProps}
      data-initial-api={initialApi}
      data-initial-color-scheme={initialColorScheme}
    >
      <head>
        <CookieColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <Providers
          defaultColorScheme={initialColorScheme}
          defaultApi={initialApi}
        >
          <Stack mih="100vh" gap={0}>
            <Header initialApi={initialApi} />

            <Box
              component="main"
              flex={1}
            >
              {children}
              {modal}
            </Box>

            <Footer />
          </Stack>
        </Providers>
      </body>
    </html>
  );
}