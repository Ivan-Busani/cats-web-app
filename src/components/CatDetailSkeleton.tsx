export function CatDetailSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-zinc-100">
      <div className="relative w-full md:w-1/2 h-[420px] md:h-[480px] bg-zinc-200 animate-pulse" />

      <div className="p-10 flex flex-col justify-center w-full md:w-1/2 bg-zinc-50">
        <div className="h-10 w-3/4 bg-zinc-200 rounded mb-6 animate-pulse" />

        <div className="space-y-4">
          <div className="h-5 w-full bg-zinc-200 rounded animate-pulse" />
          <div className="h-5 w-11/12 bg-zinc-200 rounded animate-pulse" />
          <div className="h-5 w-10/12 bg-zinc-200 rounded animate-pulse" />
          <div className="h-5 w-9/12 bg-zinc-200 rounded animate-pulse" />
          <div className="h-5 w-8/12 bg-zinc-200 rounded animate-pulse" />
        </div>

        <div className="mt-10 space-y-4">
          <div className="h-11 w-full bg-zinc-200 rounded-xl animate-pulse" />
          <div className="h-11 w-full bg-zinc-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

