"use server";

import { CatDB, SaveCatPayload } from "@/types/cat_db";

const baseUrl = () => {
  const url = process.env.PYTHON_API_URL;
  if (!url) throw new Error("PYTHON_API_URL is not set");
  return url.replace(/\/$/, "");
};

export async function fetchFavorites(): Promise<CatDB[]> {
  const response = await fetch(`${baseUrl()}/api/v1/cats/list/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los datos de la API Python");
  }

  return response.json();
}

export async function saveFavorite(payload: SaveCatPayload): Promise<CatDB> {
  const response = await fetch(`${baseUrl()}/api/v1/cats/save/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = (body as { detail?: string }).detail ?? "Error al guardar el gato en la API Python";
    throw new Error(message);
  }

  return response.json();
}
