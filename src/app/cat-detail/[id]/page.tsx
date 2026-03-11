import type { Metadata } from "next";
import { getCatById } from "@/actions/cat-api.actions";
import { getFavoriteByCatId } from "@/actions/api.actions";
import {
  Button,
  Container,
} from "@mantine/core";
import { CatDetailCard } from "@/components/cat-detail/CatDetailCard";

interface CatDetailsProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ isFavorite?: boolean }>;
}

export async function generateMetadata({
  params,
}: CatDetailsProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cat = await getCatById(resolvedParams.id);
  const breed = cat.breeds[0];

  return {
    title: `Gato ${breed?.name ?? "desconocido"} | CatGallery`,
    description: `Descubre los detalles técnicos de este asombroso gato. Resolución original: ${cat.width}x${cat.height} píxeles.`,
    openGraph: {
      title: `Gato ${breed?.name ?? "desconocido"}`,
      description: `Descubre los detalles técnicos de este asombroso gato.`,
      images: [
        {
          url: cat.url,
          width: cat.width,
          height: cat.height,
          alt: `Gato ${breed?.name ?? "desconocido"}`,
        },
      ],
    },
  };
}

export default async function CatDetailsPage({ params, searchParams }: CatDetailsProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const cat = await getCatById(resolvedParams.id);
  const isFavorite = resolvedSearchParams.isFavorite;
  const favorite = isFavorite ? await getFavoriteByCatId(cat.id) : null;

  return (
    <Container size="lg" py="xl">
      <Button component="a" href="/" variant="subtle" mb="md">
        ← Volver a la galería
      </Button>

      <CatDetailCard cat={cat} isFavorite={isFavorite} dbId={favorite?.id} />
    </Container>
  );
}