import { Card, Group, Skeleton, Stack } from "@mantine/core";

export function CatDetailSkeleton() {
  return (
    <Card radius="xl" shadow="xl" withBorder padding="lg">
      <Group align="stretch" gap="lg" wrap="nowrap">
        <Skeleton height={420} radius="lg" flex={1} />
        <Stack gap="md" flex={1}>
          <Skeleton height={40} width="70%" />
          <Stack gap="xs">
            <Skeleton height={18} />
            <Skeleton height={18} width="90%" />
            <Skeleton height={18} width="80%" />
            <Skeleton height={18} width="75%" />
            <Skeleton height={18} width="70%" />
          </Stack>
          <Stack gap="sm" mt="md">
            <Skeleton height={44} radius="xl" />
            <Skeleton height={44} radius="xl" />
          </Stack>
        </Stack>
      </Group>
    </Card>
  );
}

