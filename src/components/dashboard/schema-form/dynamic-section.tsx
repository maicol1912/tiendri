"use client";

import * as LucideIcons from "lucide-react";
import type { ConfigSection } from "@/types/templates/config-schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getByPath } from "@/lib/config-path-utils";
import { DynamicField } from "./dynamic-field";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DynamicSectionProps {
  section: ConfigSection;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Icon resolver
// ---------------------------------------------------------------------------

type LucideIconComponent = React.ComponentType<{ className?: string }>;

function resolveLucideIcon(name?: string): LucideIconComponent | null {
  if (!name) return null;

  // lucide-react exports icons as PascalCase — e.g. "Image" -> Image, "Link2" -> Link2
  const icon = (LucideIcons as unknown as Record<string, unknown>)[name];
  if (typeof icon === "function") return icon as LucideIconComponent;

  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DynamicSection({
  section,
  values,
  onChange,
  errors,
}: DynamicSectionProps) {
  const Icon = resolveLucideIcon(section.icon);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {Icon && <Icon className="size-4 text-muted-foreground" />}
          {section.label}
        </CardTitle>
        {section.description && (
          <CardDescription>{section.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {section.fields.map((field) => (
          <DynamicField
            key={field.key}
            field={field}
            value={getByPath(values, field.key)}
            onChange={(v) => onChange(field.key, v)}
            error={errors?.[field.key]}
          />
        ))}
      </CardContent>
    </Card>
  );
}
