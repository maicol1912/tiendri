"use client";

import { useCallback, type RefObject } from "react";
import type { TiendriPostMessage } from "@/types/postmessage";
import { resolveTemplateConfig } from "@/catalog/resolveTemplateConfig";
import { buildCssVars } from "@/catalog/buildCssVars";
import type { TemplateConfig, StoreCustomization } from "@/types/templates";

export function usePreviewSync(
  iframeRef: RefObject<HTMLIFrameElement | null>
) {
  const sendCssVars = useCallback((vars: Record<string, string>) => {
    const msg: TiendriPostMessage = {
      type: "TIENDRI_CSS_VAR_UPDATE",
      payload: { vars },
    };
    iframeRef.current?.contentWindow?.postMessage(msg, window.location.origin);
  }, [iframeRef]);

  const sendReload = useCallback((reason?: string) => {
    const msg: TiendriPostMessage = {
      type: "TIENDRI_RELOAD_REQUEST",
      payload: { reason },
    };
    iframeRef.current?.contentWindow?.postMessage(msg, window.location.origin);
  }, [iframeRef]);

  return { sendCssVars, sendReload };
}

export function buildPreviewVars(
  manifest: TemplateConfig,
  customization: StoreCustomization
): Record<string, string> {
  const resolved = resolveTemplateConfig(manifest, customization);
  return buildCssVars(resolved);
}
