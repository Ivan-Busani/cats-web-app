"use client";

import { useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { CatImage } from "@/types/cat";
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
} from "@mantine/core";

interface CatGalleryProps {
  initialCats: CatImage[];
}

export function CatsGallery({ initialCats }: CatGalleryProps) {
  const { cats, setCats, addMoreCats } = useCatStore();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cats.length === 0) {
      setCats(initialCats);
    }
  }, [cats.length, initialCats, setCats]);

  const handleLoadMore = async () => {
    startTransition(async () => {
      const newCats = await fetchCats(4);
      addMoreCats(newCats);
    });
  };

  const displayCats = cats.length > 0 ? cats : initialCats;

  return (
    <Stack align="center" gap="lg">
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: "md", lg: "lg" }}
        verticalSpacing={{ base: "md", lg: "lg" }}
        w="100%"
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

      <Button
        onClick={handleLoadMore}
        loading={isPending}
        radius="xl"
        size="md"
      >
        {isPending ? "Reclutando más gatos..." : "Cargar más gatos"}
      </Button>
    </Stack>
  );
}