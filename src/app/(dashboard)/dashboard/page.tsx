// Dashboard Home — Overview stats, quick actions, and welcome message
// First thing merchants see when they open the dashboard

import {
  Package,
  FolderTree,
  CreditCard,
  Activity,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getStore } from './_actions/store';
import { countProducts } from './_actions/products';
import { countCategories } from './_actions/categories';
import { DashboardActions } from './_components/dashboard-actions';

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

// ── Page Component ─────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  // Fetch all data in parallel — single round-trip to Supabase
  const [store, productCount, categoryCount] = await Promise.all([
    getStore(),
    countProducts(),
    countCategories(),
  ]);

  const displayName = store?.name ?? 'tu tienda';
  const slug = store?.slug ?? '';
  const isActive = productCount > 0;

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
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total productos"
          value={productCount}
          icon={Package}
        />
        <StatCard
          label="Categorias"
          value={categoryCount}
          icon={FolderTree}
        />
        <StatCard
          label="Plan"
          value="Gratis"
          icon={CreditCard}
        />
        <StatCard
          label="Estado"
          value={isActive ? 'Activa' : 'En construccion'}
          icon={Activity}
          accent={isActive}
        />
      </div>

      {/* Quick actions — client component for interactivity */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">
          Acciones rapidas
        </h2>
        <DashboardActions slug={slug} />
      </div>
    </div>
  );
}
