"use client";

import { useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { CatImage } from "@/types/cat";
import { fetchCats } from "@/actions/cat.actions";
import { useCatStore } from "@/store/cats.store";

interface CatGalleryProps {
  initialCats: CatImage[];
}

export function CatsGallery({ initialCats }: CatGalleryProps) {

  const { cats, setCats, addMoreCats } = useCatStore();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cats.length === 0) {
      setCats(initialCats);
    }
  }, [cats.length, initialCats, setCats]);

  const handleLoadMore = async () => {
    startTransition(async () => {
      const newCats = await fetchCats(4);
      addMoreCats(newCats);
    });
  };

  const displayCats = cats.length > 0 ? cats : initialCats;

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {displayCats.map((cat, index) => (
          <Link
            href={`/cat/${cat.id}`}
            key={`${cat.id}-${index}`}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer block"
          >
            <Image
              src={cat.url}
              alt={`Gato ${cat.id}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={index < 4}
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </Link>
        ))}
      </div>

      <button
        onClick={handleLoadMore}
        disabled={isPending}
        className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-xl shadow-md hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      >
        {isPending ? 'Reclutando más gatos...' : 'Cargar más gatos'}
      </button>
    </div>
  );
}