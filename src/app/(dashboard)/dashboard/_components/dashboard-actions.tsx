'use client';

// Interactive quick-action buttons for the dashboard home page.
// Extracted as a client component because they use router.push, clipboard, and window.open.

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, ExternalLink, Copy, QrCode } from 'lucide-react';

interface DashboardActionsProps {
  slug: string;
}

interface QuickActionProps {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

function QuickAction({ label, description, icon: Icon, onClick }: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}

export function DashboardActions({ slug }: DashboardActionsProps) {
  const router = useRouter();

  function handleCopyLink() {
    if (!slug) {
      toast.error('Configura el slug de tu tienda primero');
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tiendri.com'}/${slug}`;
    void navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copiado al portapapeles');
    });
  }

  function handleViewStore() {
    if (!slug) {
      toast.error('Configura el slug de tu tienda primero');
      return;
    }
    window.open(`/${slug}`, '_blank');
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <QuickAction
        label="Agregar producto"
        description="Crea un nuevo producto para tu catalogo"
        icon={Plus}
        onClick={() => router.push('/dashboard/productos/nuevo')}
      />
      <QuickAction
        label="Ver mi tienda"
        description="Abre tu tienda en una nueva ventana"
        icon={ExternalLink}
        onClick={handleViewStore}
      />
      <QuickAction
        label="Copiar link"
        description={slug ? `${(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tiendri.com').replace(/^https?:\/\//, '')}/${slug}` : 'Configura tu slug primero'}
        icon={Copy}
        onClick={handleCopyLink}
      />
      <QuickAction
        label="Compartir QR"
        description="Genera y descarga tu codigo QR"
        icon={QrCode}
        onClick={() => router.push('/dashboard/compartir')}
      />
    </div>
  );
}
