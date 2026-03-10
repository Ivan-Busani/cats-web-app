"use client";

import { Modal } from "@/components/ui/Modal";
import { CatDetailSkeleton } from "@/components/cat-detail/CatDetailSkeleton";
import { Box } from "@mantine/core";

export default function Loading() {
  return (
    <Modal>
      <Box maw={800} w="100%" h="100%" style={{ maxHeight: "90vh" }}>
        <CatDetailSkeleton />
      </Box>
    </Modal>
  );
}
