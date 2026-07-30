"use client";

import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";

import DefaultSearchDialog from "@/components/search";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider search={{ SearchDialog: DefaultSearchDialog }}>
      {children}
    </RootProvider>
  );
}
