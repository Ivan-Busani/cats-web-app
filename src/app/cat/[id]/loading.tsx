import { CatDetailSkeleton } from "@/components/CatDetailSkeleton";

export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="mb-8 h-6 w-56 bg-zinc-200 rounded animate-pulse" />

      <CatDetailSkeleton />
    </main>
  );
}
