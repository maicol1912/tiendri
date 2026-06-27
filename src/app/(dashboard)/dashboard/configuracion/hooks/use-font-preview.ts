"use client";

import { useEffect } from "react";

const loadedFonts = new Set<string>();

function buildGoogleFontsUrl(families: string[]): string {
  const params = families
    .map(f => `family=${encodeURIComponent(f)}:wght@400;600`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

export function useFontPreview(fontFamilies: string[]): void {
  useEffect(() => {
    const toLoad = fontFamilies.filter(f => f && !loadedFonts.has(f));
    if (toLoad.length === 0) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = buildGoogleFontsUrl(toLoad);
    document.head.appendChild(link);

    toLoad.forEach(f => loadedFonts.add(f));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontFamilies.join(",")]);
}
