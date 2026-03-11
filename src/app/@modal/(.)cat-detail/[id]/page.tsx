import { getCatById } from "@/actions/cat-api.actions";
import { getFavoriteByCatId } from "@/actions/api.actions";
import { Modal } from "@/components/ui/Modal";
import { CatDetailCard } from "@/components/cat-detail/CatDetailCard";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ isFavorite?: boolean }>;
}

export default async function CatModal({ params, searchParams }: Props) {
  const { id } = await params;
  const { isFavorite } = await searchParams;

  const cat = await getCatById(id);
  const breed = cat.breeds?.[0];
  const favorite = isFavorite ? await getFavoriteByCatId(cat.id) : null;

  return (
    <Modal title={breed?.name ?? "Detalle del gato"}>
      <CatDetailCard cat={cat} isFavorite={isFavorite} dbId={favorite?.id} isModal={true} />
    </Modal>
  );
}