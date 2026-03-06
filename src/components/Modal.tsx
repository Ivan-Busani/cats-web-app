"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <dialog
      ref={dialogRef}
      className="m-0 h-full w-full max-h-full max-w-full bg-black/70 backdrop-blur-sm flex items-center justify-center border-none p-4"
      onClose={onDismiss}
      onClick={(e) => e.target === dialogRef.current && onDismiss()}
    >
      {children}
    </dialog>
  );
}