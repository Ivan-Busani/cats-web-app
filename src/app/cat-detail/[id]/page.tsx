import type { Metadata } from "next";
import { getCatById } from "@/actions/cat.actions";
import {
  Button,
  Container,
} from "@mantine/core";
import { CatDetailCard } from "@/components/cat-detail/CatDetailCard";

interface CatDetailsProps {
  params: Promise<{ id: string }>;
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

export default async function CatDetailsPage({ params }: CatDetailsProps) {
  const resolvedParams = await params;
  const cat = await getCatById(resolvedParams.id);
  const breed = cat.breeds[0];

  return (
    <Container size="lg" py="xl">
      <Button component="a" href="/" variant="subtle" mb="md">
        ← Volver a la galería
      </Button>

      <CatDetailCard cat={cat} />
    </Container>
  );
}