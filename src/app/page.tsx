import { fetchCats } from "@/actions/cat.actions";
import { CatsGallery } from "@/components/CatsGallery";

export default async function Home() {
  const initialCats = await fetchCats(8);

  return (
    <main className="min-h-screen p-8 bg-zinc-50 text-zinc-900">
      <div className="max-w-7xl mx-auto">        
        <CatsGallery initialCats={initialCats} />
      </div>
    </main>
  );
}