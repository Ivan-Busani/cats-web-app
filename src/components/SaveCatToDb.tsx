"use client";

import { useState } from "react";
import { CatImage } from "@/types/cat";
import { SaveCatPayload } from "@/types/cat_db";
import { saveCat as saveCatGo } from "@/actions/go.actions";
import { saveCat as saveCatPython } from "@/actions/python.actions";
import { saveCat as saveCatJava } from "@/actions/java.actions";

type ApiChoice = "go" | "python" | "java";

interface SaveCatToDbProps {
  cat: CatImage;
  className?: string;
}

export function SaveCatToDb({ cat, className = "" }: SaveCatToDbProps) {
  const [api, setApi] = useState<ApiChoice>("go");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const payload: SaveCatPayload = {
    cat_id: cat.id,
    url: cat.url,
    width: cat.width,
    height: cat.height,
    breeds: cat.breeds ?? [],
  };

  async function handleSave() {
    setStatus("loading");
    setMessage("");
    try {
      if (api === "go") {
        await saveCatGo(payload);
        setMessage("Guardado en la base de datos (API Go).");
      } else if (api === "python") {
        await saveCatPython(payload);
        setMessage("Guardado en la base de datos (API Python).");
      } else {
        await saveCatJava(payload);
        setMessage("Guardado en la base de datos (API Java).");
      }
      setStatus("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Error al guardar.");
      setStatus("error");
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="api-select" className="sr-only">
          API para guardar
        </label>
        <select
          id="api-select"
          value={api}
          onChange={(e) => setApi(e.target.value as ApiChoice)}
          disabled={status === "loading"}
          className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
        >
          <option value="go">API Go</option>
          <option value="python">API Python</option>
          <option value="java">API Java</option>
        </select>
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "loading"}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors active:scale-[0.98]"
        >
          {status === "loading" ? "Guardando…" : "Guardar en base de datos"}
        </button>
      </div>
      {message && (
        <p
          role="alert"
          className={`text-sm font-medium ${
            status === "success" ? "text-green-700" : status === "error" ? "text-red-700" : "text-zinc-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
