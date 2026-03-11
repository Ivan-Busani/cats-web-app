"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { CatImage } from "@/types/cat";
import { SaveCatPayload } from "@/types/cat_db";
import { saveFavorite, deleteFavorite } from "@/actions/api.actions";
import { API_LABELS } from "@/lib/preferences-cookies";
import { useCatStore } from "@/store/cats.store";
import { usePreferencesStore } from "@/store/preferences.store";
import { Alert, Button, Group, Modal, Stack, Text } from "@mantine/core";

interface SaveCatToDbProps {
  cat: CatImage;
  isFavorite?: boolean;
  dbId?: number;
  className?: string;
}

export function SaveCatToDb({ cat, isFavorite = false, dbId, className }: SaveCatToDbProps) {
  const router = useRouter();
  const addFavorite = useCatStore((state) => state.addFavorite);
  const removeFavoriteById = useCatStore((state) => state.removeFavoriteById);
  const api = usePreferencesStore((state) => state.api);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const payload: SaveCatPayload = {
    cat_id: cat.id,
    url: cat.url,
    width: cat.width,
    height: cat.height,
    breeds: cat.breeds ?? [],
  };

  async function handleSave() {
    setStatus("loading");
    setMessage("");
    try {
      const saved = await saveFavorite(payload);
      addFavorite(saved);
      setMessage(`Guardado en favoritos (${API_LABELS[api]}).`);
      setStatus("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Error al guardar.");
      setStatus("error");
    }
  }

  async function handleDelete() {
    closeDelete();
    setStatus("loading");
    setMessage("");
    try {
      await deleteFavorite(String(dbId!));
      removeFavoriteById(dbId!);
      router.back();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Error al eliminar.");
      setStatus("error");
    }
  }

  return (
    <Stack className={className}>
      <Stack align="center">
        {!isFavorite && (
          <Button
            type="button"
            onClick={handleSave}
            fullWidth
            loading={status === "loading"}
          >
            Guardar en favoritos
          </Button>
        )}
        {isFavorite && dbId != null && (
          <Button
            type="button"
            variant="light"
            color="red"
            fullWidth
            onClick={openDelete}
            loading={status === "loading"}
          >
            Eliminar de favoritos
          </Button>
        )}
      </Stack>

      <Modal opened={deleteOpened} onClose={closeDelete} title="Confirmar eliminación" centered>
        <Text size="sm" mb="md">
          ¿Estás seguro de que quieres eliminar este gato de tus favoritos?
        </Text>
        <Group justify="flex-end" gap="xs">
          <Button variant="default" onClick={closeDelete}>
            Cancelar
          </Button>
          <Button color="red" onClick={handleDelete}>
            Eliminar
          </Button>
        </Group>
      </Modal>

      {message && (
        <Alert
          color={status === "success" ? "green" : status === "error" ? "red" : "blue"}
        >
          <Text size="sm">{message}</Text>
        </Alert>
      )}
    </Stack>
  );
}
