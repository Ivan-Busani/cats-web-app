export default function Loading() {
  const skeletonArray = Array.from({ length: 8 });

  return (
    <main className="min-h-screen p-8 bg-zinc-50 text-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-10 tracking-tight text-zinc-300 animate-pulse">
          Cargando michis...
        </h1>
        
        <div className="flex flex-col items-center gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {skeletonArray.map((_, index) => (
              <div 
                key={index} 
                className="relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-zinc-200 animate-pulse"
              >
                {/* Cuadro gris que parpadea suavemente */}
              </div>
            ))}
          </div>
          
          {/* Esqueleto del botón */}
          <div className="w-48 h-12 bg-zinc-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </main>
  );
}