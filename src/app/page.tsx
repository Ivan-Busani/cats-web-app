import { fetchCats } from "@/actions/cat.actions";
import { fetchFavorites } from "@/actions/python.actions";
import { CatsGallery } from "@/components/gallery/CatsGallery";
import { Container, Stack, Text, Title } from "@mantine/core";

export default async function Home() {
  const initialCats = await fetchCats(8);
  const initialFavorites = await fetchFavorites();

  return (
    <Container component="main" size="lg" py="xl">
      <CatsGallery initialCats={initialCats} initialFavorites={initialFavorites} />
    </Container>
  );
}