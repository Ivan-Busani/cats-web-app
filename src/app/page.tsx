import { fetchCats } from "@/actions/cat-api.actions";
import { fetchFavorites } from "@/actions/api.actions";
import { CatsGallery } from "@/components/gallery/CatsGallery";
import { Container, Stack, Text, Title } from "@mantine/core";

export default async function Home() {
  const initialCats = await fetchCats();
  const initialFavorites = await fetchFavorites();

  return (
    <Container component="main" size="lg" py="xl">
      <CatsGallery initialCats={initialCats} initialFavorites={initialFavorites} />
    </Container>
  );
}