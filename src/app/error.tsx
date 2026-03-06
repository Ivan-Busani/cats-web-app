"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado por la arquitectura de Next.js:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <div className="text-6xl">😿</div>
      <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
        ¡Miau-l día para los servidores!
      </h2>
      <p className="text-zinc-600 max-w-md">
        Tuvimos un problema de comunicación con The Cat API. Puede que la red esté inestable o que los gatos se hayan escapado.
      </p>
      
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition-all active:scale-95"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}