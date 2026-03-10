"use client";

import { useEffect } from "react";
import { Button, Container, Stack, Text, Title } from "@mantine/core";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado por la arquitectura de Next.js:", error);
  }, [error]);

  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="md">
        <Text fz={48}>😿</Text>
        <Title order={2}>¡Miau-l día para los servidores!</Title>
        <Text ta="center">
          Tuvimos un problema de comunicación con The Cat API. Puede que la red
          esté inestable o que los gatos se hayan escapado.
        </Text>
        <Button color="red" onClick={() => reset()}>
          Intentar de nuevo
        </Button>
      </Stack>
    </Container>
  );
}