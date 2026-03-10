import { getCatById } from "@/actions/cat.actions";
import { Modal } from "@/components/ui/Modal";
import { CatDetailCard } from "@/components/cat-detail/CatDetailCard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CatModal({ params }: Props) {
  const { id } = await params;
  const cat = await getCatById(id);
  const breed = cat.breeds?.[0];

  return (
    <Modal title={breed?.name ?? "Detalle del gato"}>
      <CatDetailCard cat={cat} />
    </Modal>
  );
}