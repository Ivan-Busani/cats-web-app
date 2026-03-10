"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal as MantineModal, useMantineColorScheme } from "@mantine/core";

export function Modal({ 
  children, 
  title
}: { 
  children: React.ReactNode, 
  title?: string | React.ReactNode
}) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    setOpened(true);
  }, []);

  const handleClose = () => {
    setOpened(false);
    router.back();
  };

  return (
    <MantineModal
      title={title}
      opened={opened}
      onClose={handleClose}
      centered
      size="xl"
      overlayProps={{
        opacity: 0.4,
        blur: 8,
      }}
      withCloseButton
      trapFocus
      styles={{
        header: {
          backgroundColor: "transparent",
        },
        title: {
          color: isDark ? "#e5e7eb" : "#000000",
          fontWeight: 700,
        },
        content: {
          backgroundColor: isDark ? "rgba(15, 23, 42, 0.45)" : "rgba(255, 255, 255, 0.7)",
          borderRadius: "14px",
          border: "1px solid rgba(148, 163, 184, 0.5)",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(16px) saturate(140%)",
        },
      }}
    >
      {children}
    </MantineModal>
  );
}