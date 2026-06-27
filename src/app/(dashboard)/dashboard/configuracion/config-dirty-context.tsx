"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ConfigDirtyContextValue {
  dirtyTabs: Set<string>;
  markDirty: (tabId: string) => void;
  markClean: (tabId: string) => void;
  isAnyDirty: boolean;
}

const ConfigDirtyContext = createContext<ConfigDirtyContextValue | null>(null);

export function ConfigDirtyProvider({ children }: { children: ReactNode }) {
  const [dirtyTabs, setDirtyTabs] = useState<Set<string>>(new Set());

  const markDirty = (tabId: string) =>
    setDirtyTabs(prev => new Set([...prev, tabId]));

  const markClean = (tabId: string) =>
    setDirtyTabs(prev => {
      const next = new Set(prev);
      next.delete(tabId);
      return next;
    });

  return (
    <ConfigDirtyContext value={{ dirtyTabs, markDirty, markClean, isAnyDirty: dirtyTabs.size > 0 }}>
      {children}
    </ConfigDirtyContext>
  );
}

export function useConfigDirty(): ConfigDirtyContextValue {
  const ctx = useContext(ConfigDirtyContext);
  if (!ctx) throw new Error("useConfigDirty must be used within ConfigDirtyProvider");
  return ctx;
}
