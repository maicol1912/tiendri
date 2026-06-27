"use client"

import { forwardRef, useState } from "react"
import { Monitor, RotateCw, Smartphone, Tablet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/shared/utils"

type Device = "mobile" | "tablet" | "desktop"

const DEVICE_WIDTHS: Record<Device, string> = {
  mobile: "375px",
  tablet: "768px",
  desktop: "100%",
}

interface PreviewFrameProps {
  src: string | null
  isLoaded: boolean
  onLoad: () => void
}

const PreviewFrame = forwardRef<HTMLIFrameElement, PreviewFrameProps>(
  ({ src, isLoaded: _isLoaded, onLoad }, ref) => {
    const [device, setDevice] = useState<Device>("desktop")

    function handleRefresh() {
      if (typeof ref === "function") return
      ref?.current?.contentWindow?.location.reload()
    }

    return (
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDevice("mobile")}
              className={cn(device === "mobile" && "bg-accent")}
              title="Móvil"
            >
              <Smartphone />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDevice("tablet")}
              className={cn(device === "tablet" && "bg-accent")}
              title="Tablet"
            >
              <Tablet />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDevice("desktop")}
              className={cn(device === "desktop" && "bg-accent")}
              title="Escritorio"
            >
              <Monitor />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            title="Refrescar"
          >
            <RotateCw />
          </Button>
        </div>

        {/* Preview area */}
        <div className="flex-1 flex justify-center overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{ width: DEVICE_WIDTHS[device] }}
          >
            {src ? (
              <iframe
                ref={ref}
                src={src}
                title="Vista previa de tu tienda"
                onLoad={onLoad}
                className="w-full h-full border-0 rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
                <Monitor className="w-8 h-8" />
                <p className="text-sm text-center max-w-48">
                  Guardá los cambios para ver la vista previa de tu tienda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
)

PreviewFrame.displayName = "PreviewFrame"

export { PreviewFrame }
