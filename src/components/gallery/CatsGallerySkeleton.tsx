import { Container, SimpleGrid, Skeleton, Stack, Title } from "@mantine/core";

export function CatsGallerySkeleton() {
  const skeletonArray = Array.from({ length: 8 });

  return (
    <Container component="main" size="lg" py="xl">
      <Stack align="center" gap="lg">
        <Title order={1} c="dimmed">
          Cargando michis...
        </Title>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing="md"
          w="100%"
        >
          {skeletonArray.map((_, index) => (
            <Skeleton key={index} height={260} radius="lg" />
          ))}
        </SimpleGrid>

        <Skeleton height={44} width={180} radius="xl" />
      </Stack>
    </Container>
  );
}

