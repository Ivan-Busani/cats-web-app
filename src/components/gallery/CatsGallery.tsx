"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { CatImage } from "@/types/cat";
import { CatDB } from "@/types/cat_db";
import { fetchCats } from "@/actions/cat.actions";
import { useCatStore } from "@/store/cats.store";
import {
  Button,
  Card,
  SimpleGrid,
  Stack,
  AspectRatio,
  Text,
  Group,
  Badge,
  Tabs,
  ScrollArea,
  Space,
  Center,
} from "@mantine/core";

interface CatGalleryProps {
  initialCats: CatImage[];
  initialFavorites: CatDB[];
}

export function CatsGallery({ initialCats, initialFavorites }: CatGalleryProps) {
  const {
    cats,
    setCats,
    addMoreCats,
    favorites,
    setFavorites,
    addFavorite,
    removeFavorite
  } = useCatStore();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<string | null>("gallery");

  useEffect(() => {
    if (cats.length === 0) {
      setCats(initialCats);
    }
    if (favorites.length === 0) {
      setFavorites(initialFavorites);
    }
  }, [cats.length, initialCats, setCats]);

  const handleLoadMore = async () => {
    startTransition(async () => {
      if (activeTab === "gallery") {
        const newCats = await fetchCats(4);
        addMoreCats(newCats);
      } else {
        // const newFavorites = await fetchFavorites();
        // setFavorites(newFavorites);
      }
    });
  };

  const displayCats = cats.length > 0 ? cats : initialCats;
  const displayFavorites = favorites.length > 0 ? favorites : initialFavorites;

  return (
    <Stack align="center" gap="lg">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="gallery">Galeria</Tabs.Tab>
          <Tabs.Tab value="favorites">Mis favoritos</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <ScrollArea h="calc(100vh - 140px)">
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={{ base: "md", lg: "lg" }}
              verticalSpacing={{ base: "md", lg: "lg" }}
              w="100%"
              pt="md"
              pb="md"
            >
              {displayCats.map((cat) => {
                const breedName = cat.breeds?.[0]?.name ?? "Raza desconocida";
                const origin = cat.breeds?.[0]?.origin ?? "Origen desconocido";

                return (
                  <Card
                    key={cat.id}
                    component={Link}
                    href={`/cat-detail/${cat.id}`}
                    shadow="md"
                    radius="lg"
                    withBorder
                    padding="sm"
                    style={{ textDecoration: "none" }}
                  >
                    <Card.Section>
                      <AspectRatio ratio={1}>
                        <Image
                          src={cat.url}
                          alt={breedName}
                          width={400}
                          height={400}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          style={{ objectFit: "cover" }}
                        />
                      </AspectRatio>
                    </Card.Section>

                    <Stack gap="xs" mt="sm">
                      <Group justify="space-between" align="center">
                        <Text fw={600} size="sm">
                          {breedName}
                        </Text>
                        <Badge size="xs" radius="sm" variant="light">
                          {origin}
                        </Badge>
                      </Group>
                      <Text size="xs" lineClamp={2}>
                        {`${cat.breeds?.[0]?.temperament ?? "Sin descripción de temperamento"}`}
                      </Text>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>

            <Center>
              <Button
                onClick={handleLoadMore}
                loading={isPending}
                radius="xl"
                size="md"
              >
                {isPending ? "Reclutando más michis..." : "Cargar más michis"}
              </Button>
            </Center>

            <Space h="50px" />
          </ScrollArea>
        </Tabs.Panel>

        <Tabs.Panel value="favorites">
          <ScrollArea h="calc(100vh - 140px)">
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={{ base: "md", lg: "lg" }}
              verticalSpacing={{ base: "md", lg: "lg" }}
              w="100%"
              pt="md"
              pb="md"
            >
              {displayFavorites.map((favorite) => {
                return (
                  <Card key={favorite.id} component={Link} href={`/cat-detail/${favorite.cat_id}`} shadow="md" radius="lg" withBorder padding="sm" style={{ textDecoration: "none" }}>
                    <Card.Section>
                      <AspectRatio ratio={1}>
                        <Image src={favorite.url} alt={favorite.breeds?.[0]?.name ?? "Raza desconocida"} width={400} height={400} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                      </AspectRatio>
                    </Card.Section>
                  </Card>
                );
              })}
            </SimpleGrid>

            <Center>
              <Button
                onClick={handleLoadMore}
                loading={isPending}
                radius="xl"
                size="md"
              >
                {isPending ? "Trayendo michis de la casa..." : "Cargar más michis"}
              </Button>
            </Center>

            <Space h="50px" />
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}