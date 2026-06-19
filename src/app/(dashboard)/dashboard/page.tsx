'use client';

// Dashboard Home — Overview stats, quick actions, and welcome message
// First thing merchants see when they open the dashboard

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Package,
  FolderTree,
  CreditCard,
  Activity,
  Plus,
  ExternalLink,
  Copy,
  QrCode,
  Loader2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StorageIndicator } from '@/components/shared';
import { getRepositories, getStoreId } from '@/infrastructure/repositories';

// ── Types ──────────────────────────────────────────────────────────────────────

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  plan: string;
  status: 'active' | 'building';
}

interface StoreInfo {
  name: string;
  slug: string;
}

// ── Stat Card ──────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  accent?: boolean;
}

function StatCard({ label, value, icon: Icon, accent }: StatCardProps) {
  return (
    <Card className="border-gray-200 bg-white shadow-sm">
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
            accent ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Quick Action Card ──────────────────────────────────────────────────────────

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

// ── Page Component ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({ name: '', slug: '' });
  const [isLoading, setIsLoading] = useState(true);

  const storeId = getStoreId();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const { categories, products, store } = getRepositories();

        // Load counts in parallel
        const [productCount, categoryCount, storeMeta] = await Promise.all([
          products.count(storeId),
          categories.count(storeId),
          store.get(storeId),
        ]);

        setStats({
          totalProducts: productCount,
          totalCategories: categoryCount,
          plan: 'Gratis',
          status: productCount > 0 ? 'active' : 'building',
        });

        // Load store name/slug from localStorage
        try {
          const storeRaw = localStorage.getItem('tiendri_demo-store_store');
          if (storeRaw) {
            const parsed = JSON.parse(storeRaw) as Partial<StoreInfo>;
            setStoreInfo({
              name: parsed.name ?? storeMeta?.name ?? 'Mi Tienda',
              slug: parsed.slug ?? storeMeta?.slug ?? '',
            });
          } else if (storeMeta) {
            setStoreInfo({ name: storeMeta.name, slug: storeMeta.slug });
          }
        } catch {
          // Fallback if localStorage is corrupted
          if (storeMeta) {
            setStoreInfo({ name: storeMeta.name, slug: storeMeta.slug });
          }
        }
      } catch {
        toast.error('Error al cargar los datos del dashboard');
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, [storeId]);

  // ── Action handlers ──────────────────────────────────────────────────────

  function handleCopyLink() {
    if (!storeInfo.slug) {
      toast.error('Configura el slug de tu tienda primero');
      return;
    }
    const url = `tiendri.com/${storeInfo.slug}`;
    void navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copiado al portapapeles');
    });
  }

  function handleViewStore() {
    if (!storeInfo.slug) {
      toast.error('Configura el slug de tu tienda primero');
      return;
    }
    window.open(`/${storeInfo.slug}`, '_blank');
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const displayName = storeInfo.name || 'tu tienda';

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Bienvenido a {displayName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Aca podes ver un resumen de tu tienda y acceder rapidamente a las secciones principales.
        </p>
      </div>

      {/* Stats grid */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Total productos"
            value={stats.totalProducts}
            icon={Package}
          />
          <StatCard
            label="Categorias"
            value={stats.totalCategories}
            icon={FolderTree}
          />
          <StatCard
            label="Plan"
            value={stats.plan}
            icon={CreditCard}
          />
          <StatCard
            label="Estado"
            value={stats.status === 'active' ? 'Activa' : 'En construccion'}
            icon={Activity}
            accent={stats.status === 'active'}
          />
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">
          Acciones rapidas
        </h2>
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
            description={storeInfo.slug ? `tiendri.com/${storeInfo.slug}` : 'Configura tu slug primero'}
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
      </div>

      {/* Storage indicator */}
      <Card className="border-gray-200 bg-white shadow-sm">
        <CardContent className="p-4">
          <StorageIndicator storeId={storeId} />
        </CardContent>
      </Card>
    </div>
  );
}
