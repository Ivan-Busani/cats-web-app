"use server";

import { CatImage } from "@/types/cat";

const baseUrl = () => {
  const url = process.env.CAT_API_URL;
  if (!url) throw new Error("CAT_API_URL is not set");
  return url.replace(/\/$/, "");
};

export async function fetchCats(limit: number = 12, has_breeds: boolean = true): Promise<CatImage[]> {
  const response = await fetch(`${baseUrl()}/v1/images/search?limit=${limit}&has_breeds=${has_breeds}`, {
    headers: {
      'x-api-key': process.env.CAT_API_KEY as string,
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Error al obtener los datos de la API');
  }

  return response.json();
}

export async function getCatById(id: string): Promise<CatImage> {
  const res = await fetch(`${baseUrl()}/v1/images/${id}`, {
    headers: {
      'x-api-key': process.env.CAT_API_KEY as string,
    },
    cache: 'force-cache' 
  });

  if (!res.ok) {
    throw new Error(`Error al obtener el gato con ID: ${id}`);
  }

  return res.json();
}