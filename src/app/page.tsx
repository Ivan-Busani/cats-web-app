import { fetchCats } from "@/actions/cat.actions";
import { CatsGallery } from "@/components/gallery/CatsGallery";
import { Container, Stack, Text, Title } from "@mantine/core";

export default async function Home() {
  const initialCats = await fetchCats(8);

  return (
    <Container component="main" size="lg" py="xl">
      <CatsGallery initialCats={initialCats} />
    </Container>
  );
}