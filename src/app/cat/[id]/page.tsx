import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getCatById } from "@/actions/cat.actions";
import { SaveCatToDb } from "@/components/SaveCatToDb";


interface CatDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CatDetailsProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  const cat = await getCatById(resolvedParams.id);

  return {
    title: `Gato ${cat.breeds[0].name} | CatGallery`,
    description: `Descubre los detalles técnicos de este asombroso gato. Resolución original: ${cat.width}x${cat.height} píxeles.`,
    openGraph: {
      title: `Gato ${cat.breeds[0].name}`,
      description: `Descubre los detalles técnicos de este asombroso gato.`,
      images: [
        {
          url: cat.url,
          width: cat.width,
          height: cat.height,
          alt: `Gato ${cat.breeds[0].name}`,
        },
      ],
    },
  };
}

export default async function CatDetailsPage({ params }: CatDetailsProps) {
  const resolvedParams = await params;
  const cat = await getCatById(resolvedParams.id);

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="mb-8">
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors"
        >
          ← Volver a la galería
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-zinc-100">
        <div className="relative w-full md:w-1/2 h-[420px] md:h-[480px]">
          <Image
            src={cat.url}
            alt={`Detalle del gato ${cat.id}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
        
        <div className="p-10 flex flex-col justify-center w-full md:w-1/2 bg-zinc-50">
          <h1 className="text-4xl font-black text-zinc-900 mb-4">
            Raza: <span className="text-blue-600 uppercase">{cat.breeds[0].name || 'Sin raza'}</span>
          </h1>
          
          <div className="space-y-4 text-zinc-600">            
            <p className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="font-semibold text-zinc-800">Peso:</span>
              <span>{cat.breeds[0].weight.imperial} - {cat.breeds[0].weight.metric} kg</span>
            </p>
            <p className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="font-semibold text-zinc-800">Temperamento:</span>
              <span>{cat.breeds[0].temperament}</span>
            </p>
            <p className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="font-semibold text-zinc-800">Origen:</span>
              <span>{cat.breeds[0].origin}</span>
            </p>
            <p className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="font-semibold text-zinc-800">Países:</span>
              <span>{cat.breeds[0].country_codes}</span>
            </p>
            <p className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="font-semibold text-zinc-800">Vida útil:</span>
              <span>{cat.breeds[0].life_span}</span>
            </p>
            <p className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="font-semibold text-zinc-800">URL de Wikipedia:</span>
              <span>
                <a href={cat.breeds[0].wikipedia_url} target="_blank" rel="noopener noreferrer">
                  <span className="text-blue-600 hover:text-blue-800 underline">
                    {cat.breeds[0].wikipedia_url}
                  </span>
                </a>
              </span>
            </p>
            <p className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="font-semibold text-zinc-800">ID en Base de Datos:</span>
              <span className="font-mono text-sm bg-zinc-200 px-2 py-1 rounded">{cat.id}</span>
            </p>
            <p className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="font-semibold text-zinc-800">Resolución Original:</span>
              <span>{cat.width} x {cat.height} px</span>
            </p>   
          </div>

          <div className="mt-10 space-y-4">
            <SaveCatToDb cat={cat} />
            <a 
              href={cat.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-8 py-3 bg-zinc-900 text-white font-semibold rounded-xl shadow-md hover:bg-zinc-800 transition-all active:scale-95"
            >
              Ver imagen en alta calidad
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}