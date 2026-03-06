"use client";

import { Modal } from "@/components/Modal";
import { CatDetailSkeleton } from "@/components/CatDetailSkeleton";

export default function Loading() {
  return (
    <Modal>
      <div className="max-w-5xl w-full max-h-[90vh]">
        <CatDetailSkeleton />
      </div>
    </Modal>
  );
}
