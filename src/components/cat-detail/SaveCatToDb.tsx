"use client";

import { useState } from "react";
import { CatImage } from "@/types/cat";
import { SaveCatPayload } from "@/types/cat_db";
import { saveFavorite as saveCatGo } from "@/actions/go.actions";
import { saveFavorite as saveCatPython } from "@/actions/python.actions";
import { saveFavorite as saveCatJava } from "@/actions/java.actions";
import { Alert, Button, Select, Stack, Text, type StackProps } from "@mantine/core";

type ApiChoice = "go" | "python" | "java";

interface SaveCatToDbProps {
  cat: CatImage;
  className?: string;
}

export function SaveCatToDb({ cat, className }: SaveCatToDbProps) {
  const [api, setApi] = useState<ApiChoice>("go");
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
      if (api === "go") {
        await saveCatGo(payload);
        setMessage("Guardado en la base de datos (API Go).");
      } else if (api === "python") {
        await saveCatPython(payload);
        setMessage("Guardado en la base de datos (API Python).");
      } else {
        await saveCatJava(payload);
        setMessage("Guardado en la base de datos (API Java).");
      }
      setStatus("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Error al guardar.");
      setStatus("error");
    }
  }

  return (
    <Stack className={className}>
      <Stack align="center">
        <Select label="API para guardar"
          aria-label="API para guardar"
          data={[
            { value: "go", label: "API Go" },
            { value: "python", label: "API Python" },
            { value: "java", label: "API Java" },
          ]}
          value={api}
          onChange={(value) => value && setApi(value as ApiChoice)}
          disabled={status === "loading"}
          style={{ width: "100%" }}
        />
        <Button
          type="button"
          onClick={handleSave}
          fullWidth
          loading={status === "loading"}
        >
          Guardar en base de datos
        </Button>
      </Stack>

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
