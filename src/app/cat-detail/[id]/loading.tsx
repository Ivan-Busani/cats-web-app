import { CatDetailSkeleton } from "@/components/cat-detail/CatDetailSkeleton";
import { Container, Skeleton, Stack } from "@mantine/core";

export default function Loading() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Skeleton height={24} width={220} radius="sm" />
        <CatDetailSkeleton />
      </Stack>
    </Container>
  );
}
