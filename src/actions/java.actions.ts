"use server";

import { CatDB, SaveCatPayload } from "@/types/cat_db";

const baseUrl = () => {
  const url = process.env.JAVA_API_URL;
  if (!url) throw new Error("JAVA_API_URL is not set");
  return url.replace(/\/$/, "");
};

export async function fetchCats(): Promise<CatDB[]> {
  const response = await fetch(`${baseUrl()}/api/v1/cats/list/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los datos de la API Java");
  }

  return response.json();
}

export async function saveCat(payload: SaveCatPayload): Promise<CatDB> {
  const response = await fetch(`${baseUrl()}/api/v1/cats/save/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = (body as { detail?: string }).detail ?? "Error al guardar el gato en la API Java";
    throw new Error(message);
  }

  return response.json();
}
