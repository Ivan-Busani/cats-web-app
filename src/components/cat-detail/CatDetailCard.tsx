import { CatImage } from "@/types/cat";
import { SaveCatToDb } from "@/components/cat-detail/SaveCatToDb";
import {
  Anchor,
  Badge,
  Button,
  Card,
  Grid,
  GridCol,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";

type CatDetailCardProps = {
  cat: CatImage;
  isModal?: boolean;
  isFavorite?: boolean;
  dbId?: number;
};

export function CatDetailCard({ 
  cat, 
  isModal = false, 
  isFavorite = false,
  dbId,
}: CatDetailCardProps) {
  const breed = cat.breeds[0];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Grid>
        <GridCol span={{ md: 6, sm: 6 }}>
          <Image
            src={cat.url}
            alt={breed?.name ?? cat.id}
            w="100%"
            h={400}
            style={{ 
              objectFit: "contain", 
              backgroundColor: "black",
              border: "3px solid black",
            }}
          />

          <Stack justify="center" align="center">
            <Button
              component="a"
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
              mt="xs"
            >
              Ver imagen completa
            </Button>
          </Stack>
        </GridCol>

        <GridCol span={{ md: 6, sm: 6 }}>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={600}>Raza:</Text>
            <Text component="span" c="blue">
              {breed?.name ?? "Desconocida"}
            </Text>
            <Badge color="pink">{breed?.origin ?? "Desconocido"}</Badge>
          </Group>

          {breed ? (
            <>
              <Group justify="space-between">
                <Text fw={600}>Peso:</Text>
                <Text>
                  {breed.weight.imperial} · {breed.weight.metric} kg
                </Text>
              </Group>
              <Group justify="space-between">
                <Text fw={600}>Temperamento:</Text>
                <Text>{breed.temperament}</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={600}>Origen:</Text>
                <Text>{breed.origin ?? "Desconocido"}</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={600}>Países:</Text>
                <Text>{breed.country_codes}</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={600}>Vida útil:</Text>
                <Text>{breed.life_span}</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={600}>Wikipedia:</Text>
                <Anchor href={breed.wikipedia_url} target="_blank">
                  {breed.wikipedia_url}
                </Anchor>
              </Group>
            </>
          ) : (
            <Text fs="italic">
              No hay información de raza disponible para este michi.
            </Text>
          )}

          <Group justify="space-between" mt="sm">
            <Text fw={600}>ID:</Text>
            <Text fz="xs" fw={500}>
              {cat.id}
            </Text>
          </Group>
          <Group justify="space-between" mb="md">
            <Text fw={600}>Resolución:</Text>
            <Text>
              {cat.width} x {cat.height} px
            </Text>
          </Group>

          <Stack justify="center" align="center">
            <SaveCatToDb cat={cat} isFavorite={isFavorite} dbId={dbId} />
          </Stack>
        </GridCol>
      </Grid>
    </Card>
  );
}