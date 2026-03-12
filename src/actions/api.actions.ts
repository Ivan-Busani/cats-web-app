"use server";

import { cookies } from "next/headers";
import { PREFERENCES_COOKIE, type ApiChoice } from "@/lib/preferences-cookies";
import type { CatDB, SaveCatPayload } from "@/types/cat_db";

const API_URL_ENV: Record<ApiChoice, string> = {
  go: "GO_API_URL",
  java: "JAVA_API_URL",
  python: "PYTHON_API_URL",
  nodejs: "NODE_API_URL",
};

function getBaseUrl(api: ApiChoice): string {
  const envKey = API_URL_ENV[api];
  const url = process.env[envKey];
  if (!url) throw new Error(`${envKey} is not set`);
  return url.replace(/\/$/, "");
}

async function getApiFromCookie(): Promise<ApiChoice> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(PREFERENCES_COOKIE)?.value;
  if (!raw) return "go";
  try {
    const parsed = JSON.parse(raw) as { api?: string };
    if (parsed.api === "go" || parsed.api === "python" || parsed.api === "java" || parsed.api === "nodejs") {
      return parsed.api;
    }
  } catch {
    // ignore
  }
  return "go";
}

export async function fetchFavorites(): Promise<CatDB[]> {
  const api = await getApiFromCookie();
  const response = await fetch(`${getBaseUrl(api)}/api/v1/cats/list`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los datos de la API");
  }

  return response.json();
}

export async function getFavoriteByCatId(catId: string): Promise<CatDB | null> {
  const api = await getApiFromCookie();
  const response = await fetch(`${getBaseUrl(api)}/api/v1/cats/cat_id/${catId}`, {
    cache: "no-store",
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Error al obtener el favorito");
  return response.json();
}

export async function saveFavorite(payload: SaveCatPayload): Promise<CatDB> {
  const api = await getApiFromCookie();
  const response = await fetch(`${getBaseUrl(api)}/api/v1/cats/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = (body as { detail?: string }).detail ?? "Error al guardar el gato";
    throw new Error(message);
  }

  return response.json();
}

export async function deleteFavorite(id: string): Promise<void> {
  const api = await getApiFromCookie();
  const response = await fetch(`${getBaseUrl(api)}/api/v1/cats/delete/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el gato");
  }
}
