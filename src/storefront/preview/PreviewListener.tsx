"use client";

import { useEffect } from "react";
import type { TiendriPostMessage } from "@/types/postmessage";

export default function PreviewListener() {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;

      const msg = event.data as TiendriPostMessage;
      if (!msg?.type) return;

      if (msg.type === "TIENDRI_CSS_VAR_UPDATE") {
        const scope = document.querySelector(".template-scope") as HTMLElement | null;
        if (!scope) return;
        const payload = msg.payload as { vars: Record<string, string> };
        for (const [varName, value] of Object.entries(payload.vars)) {
          scope.style.setProperty(varName, value);
        }
      }

      if (msg.type === "TIENDRI_RELOAD_REQUEST") {
        window.location.reload();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
