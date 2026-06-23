'use client';

import { useRef, useCallback } from 'react';
import { toast } from 'sonner';
import {
  Copy,
  Download,
  QrCode,
  Share2,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const QR_SIZE = 256;

interface Props {
  storeName: string;
  slug: string;
}

export function CompartirClient({ storeName, slug }: Props) {
  const qrRef = useRef<HTMLCanvasElement>(null);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tiendri.com';
  const storeUrl = `${siteUrl.replace(/^https?:\/\//, '')}/${slug}`;
  const fullUrl = `${siteUrl}/${slug}`;

  const handleCopyLink = useCallback(() => {
    void navigator.clipboard.writeText(fullUrl).then(() => {
      toast.success('Link copiado al portapapeles');
    });
  }, [fullUrl]);

  const handleDownloadQR = useCallback(() => {
    if (!qrRef.current) {
      toast.error('No se pudo generar el QR');
      return;
    }
    try {
      const dataUrl = qrRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-${slug}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('QR descargado');
    } catch {
      toast.error('Error al descargar el QR');
    }
  }, [slug]);

  const handleShareWhatsApp = useCallback(() => {
    const message = encodeURIComponent(
      `Visita mi tienda online: ${storeName}\n${fullUrl}\n\nPedidos desde ${siteUrl.replace(/^https?:\/\//, '')}/${slug}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }, [fullUrl, storeName, slug, siteUrl]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Compartir</h1>
        <p className="text-sm text-muted-foreground">
          Comparti tu tienda con tus clientes usando el codigo QR o el link directo.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Codigo QR</CardTitle>
            <CardDescription>
              Imprimilo o compartí la imagen para que tus clientes escaneen y lleguen a tu tienda.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="rounded-xl bg-muted p-4">
              <QRCodeCanvas
                ref={qrRef}
                value={fullUrl}
                size={QR_SIZE}
                level="M"
                marginSize={2}
                title={`QR de ${storeName}`}
              />
            </div>

            <p className="text-center text-sm font-medium text-muted-foreground">
              {storeUrl}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadQR}
                className="gap-2"
              >
                <Download className="size-4" />
                Descargar QR
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Opciones para compartir</CardTitle>
            <CardDescription>
              Copia el link de tu tienda o comparti directamente por WhatsApp.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg border bg-muted px-3 py-2.5">
              <span className="flex-1 truncate text-sm text-foreground">
                {fullUrl}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                onClick={handleCopyLink}
                aria-label="Copiar link"
              >
                <Copy className="size-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <Copy className="size-4 shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium">Copiar link</p>
                  <p className="text-xs text-muted-foreground">
                    Copia el enlace de tu tienda al portapapeles
                  </p>
                </div>
              </Button>

              <Button
                onClick={handleShareWhatsApp}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <Share2 className="size-4 shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium">Compartir por WhatsApp</p>
                  <p className="text-xs text-muted-foreground">
                    Enviá el link de tu tienda a tus contactos
                  </p>
                </div>
              </Button>

              <Button
                onClick={handleDownloadQR}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <Download className="size-4 shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium">Descargar QR en PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Descargá el codigo QR para imprimirlo
                  </p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function CompartirEmptyState() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Compartir</h1>
        <p className="text-sm text-muted-foreground">
          Comparti tu tienda con tus clientes.
        </p>
      </div>
      <Card className="border bg-card shadow-sm">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <QrCode className="size-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Configurá tu tienda primero</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Necesitás configurar el slug de tu tienda en Configuración para poder compartirla.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
