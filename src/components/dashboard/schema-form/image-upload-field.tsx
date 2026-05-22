"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadFieldProps {
  value: string;
  onChange: (dataUrl: string) => void;
  aspectRatio?: string;
  maxFileSize?: number;
}

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_WIDTH = 800;
const QUALITY = 0.85;

async function resizeToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas no disponible"));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            // Fallback to PNG
            canvas.toBlob(
              (pngBlob) => {
                if (!pngBlob) {
                  reject(new Error("Error al procesar imagen"));
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject(new Error("Error al leer imagen"));
                reader.readAsDataURL(pngBlob);
              },
              "image/png"
            );
            return;
          }
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Error al leer imagen"));
          reader.readAsDataURL(blob);
        },
        "image/webp",
        QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No se pudo cargar la imagen"));
    };

    img.src = objectUrl;
  });
}

export function ImageUploadField({
  value,
  onChange,
  aspectRatio,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Reset input so same file can be re-selected
      e.target.value = "";

      if (file.size > maxFileSize) {
        const maxMB = Math.round(maxFileSize / (1024 * 1024));
        setError(`El archivo supera el limite de ${maxMB} MB`);
        return;
      }

      setError(null);
      setIsProcessing(true);

      try {
        const dataUrl = await resizeToDataUrl(file);
        onChange(dataUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al procesar imagen");
      } finally {
        setIsProcessing(false);
      }
    },
    [maxFileSize, onChange]
  );

  const handleRemove = useCallback(() => {
    onChange("");
    setError(null);
  }, [onChange]);

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Vista previa"
            className="w-full max-h-48 rounded-md border object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon-xs"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
            aria-label="Eliminar imagen"
          >
            <X className="size-3" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isProcessing}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-muted-foreground/25 px-4 py-8 text-muted-foreground transition-colors hover:border-muted-foreground/50 hover:text-foreground disabled:opacity-50"
        >
          {isProcessing ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <Upload className="size-6" />
          )}
          <span className="text-sm">
            {isProcessing ? "Procesando..." : "Haz clic para subir una imagen"}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {aspectRatio && (
        <p className="text-xs text-muted-foreground">
          Relacion de aspecto recomendada: {aspectRatio}
        </p>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
