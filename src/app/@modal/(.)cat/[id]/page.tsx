import Image from "next/image";
import { getCatById } from "@/actions/cat.actions";
import { Modal } from "@/components/Modal";
import { SaveCatToDb } from "@/components/SaveCatToDb";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CatModal({ params }: Props) {
  const { id } = await params;
  const cat = await getCatById(id);
  const breed = cat.breeds?.[0];

  return (
    <Modal>
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-5xl w-full max-h-[90vh] border border-zinc-200">
        {/* Lado Izquierdo: Imagen */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-zinc-100">
          <Image
            src={cat.url}
            alt={id}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Lado Derecho: Info con Scroll si es necesario */}
        <div className="p-8 md:p-10 flex flex-col w-full md:w-1/2 overflow-y-auto bg-zinc-50">
          <h2 className="text-3xl font-black text-zinc-900 mb-2">
            Raza: <span className="text-blue-600 uppercase">{breed?.name || 'Desconocida'}</span>
          </h2>

          <div className="space-y-3 text-sm text-zinc-600">
            {breed ? (
              <>
                <p className="border-b border-zinc-200 pb-2">
                  <span className="font-bold text-zinc-800">Temperamento:</span> {breed.temperament}
                </p>
                <p className="border-b border-zinc-200 pb-2">
                  <span className="font-bold text-zinc-800">Origen:</span> {breed.origin} ({breed.country_codes})
                </p>
                <p className="border-b border-zinc-200 pb-2">
                  <span className="font-bold text-zinc-800">Vida útil:</span> {breed.life_span} años
                </p>
                <p className="border-b border-zinc-200 pb-2">
                  <span className="font-bold text-zinc-800">Peso:</span> {breed.weight.metric} kg
                </p>
                <div className="py-2">
                  <a href={breed.wikipedia_url} target="_blank" className="text-blue-600 hover:underline font-medium">
                    Leer más en Wikipedia →
                  </a>
                </div>
              </>
            ) : (
              <p className="italic text-zinc-400">No hay información de raza disponible para este michi.</p>
            )}

            <div className="pt-4 mt-4 border-t border-zinc-200">
              <p className="text-xs text-zinc-400 font-mono">ID: {cat.id} | {cat.width}x{cat.height}px</p>
            </div>
          </div>

          <div className="mt-auto pt-6 space-y-4">
            <SaveCatToDb cat={cat} />
            <a
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-transform active:scale-95"
            >
              Abrir original
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}