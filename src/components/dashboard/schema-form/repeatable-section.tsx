"use client";

import { useCallback } from "react";
import * as LucideIcons from "lucide-react";
import { Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { RepeatableConfigSection } from "@/types/templates/config-schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DynamicField } from "./dynamic-field";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Each item needs a stable ID for dnd-kit. We add __id internally. */
interface ItemWithId extends Record<string, unknown> {
  __id: string;
}

interface RepeatableSectionProps {
  section: RepeatableConfigSection;
  items: Record<string, unknown>[];
  onChange: (items: Record<string, unknown>[]) => void;
  errors?: Record<string, Record<string, string>>;
}

// ---------------------------------------------------------------------------
// ID management
// ---------------------------------------------------------------------------

let idCounter = 0;

function ensureId(item: Record<string, unknown>): ItemWithId {
  if (typeof item.__id === "string" && item.__id) return item as ItemWithId;
  return { ...item, __id: `rep_${Date.now()}_${idCounter++}` };
}

function stripId(item: ItemWithId): Record<string, unknown> {
  const { __id: _, ...rest } = item;
  return rest;
}

// ---------------------------------------------------------------------------
// Icon resolver
// ---------------------------------------------------------------------------

type LucideIconComponent = React.ComponentType<{ className?: string }>;

function resolveLucideIcon(name?: string): LucideIconComponent | null {
  if (!name) return null;
  const icon = (LucideIcons as unknown as Record<string, unknown>)[name];
  if (typeof icon === "function") return icon as LucideIconComponent;
  return null;
}

// ---------------------------------------------------------------------------
// Sortable item card
// ---------------------------------------------------------------------------

interface SortableItemCardProps {
  item: ItemWithId;
  index: number;
  section: RepeatableConfigSection;
  onFieldChange: (index: number, key: string, value: unknown) => void;
  onRemove: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
  canRemove: boolean;
  errors?: Record<string, string>;
}

function SortableItemCard({
  item,
  index,
  section,
  onFieldChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  canRemove,
  errors,
}: SortableItemCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.__id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card className="py-3">
        <CardContent className="space-y-3 px-4">
          {/* Item header: drag handle / mobile arrows + item label + remove */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Desktop drag handle */}
              <button
                type="button"
                className="hidden md:flex cursor-grab active:cursor-grabbing items-center justify-center rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Arrastrar para reordenar"
                {...listeners}
                {...attributes}
              >
                <GripVertical className="size-4" />
              </button>

              {/* Mobile up/down */}
              <div className="flex flex-col gap-0.5 md:hidden">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => onMoveUp(index)}
                  disabled={isFirst}
                  aria-label="Mover arriba"
                >
                  <ChevronUp className="size-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => onMoveDown(index)}
                  disabled={isLast}
                  aria-label="Mover abajo"
                >
                  <ChevronDown className="size-3" />
                </Button>
              </div>

              <span className="text-sm font-medium text-muted-foreground">
                {section.itemLabel} {index + 1}
              </span>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => onRemove(index)}
              disabled={!canRemove}
              aria-label={`Eliminar ${section.itemLabel} ${index + 1}`}
            >
              <Trash2 className="size-3.5 text-destructive" />
            </Button>
          </div>

          {/* Fields */}
          {section.fields.map((field) => (
            <DynamicField
              key={field.key}
              field={field}
              value={item[field.key]}
              onChange={(v) => onFieldChange(index, field.key, v)}
              error={errors?.[field.key]}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function RepeatableSection({
  section,
  items: rawItems,
  onChange,
  errors,
}: RepeatableSectionProps) {
  const Icon = resolveLucideIcon(section.icon);

  // Ensure all items have stable IDs
  const items: ItemWithId[] = rawItems.map(ensureId);

  const minItems = section.minItems ?? 0;
  const maxItems = section.maxItems;
  const canAdd = maxItems == null || items.length < maxItems;
  const canRemove = items.length > minItems;

  // Sensors for dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // --- Handlers ---

  const emitChange = useCallback(
    (newItems: ItemWithId[]) => {
      onChange(newItems.map(stripId));
    },
    [onChange]
  );

  const handleFieldChange = useCallback(
    (index: number, key: string, value: unknown) => {
      const updated = items.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      );
      emitChange(updated);
    },
    [items, emitChange]
  );

  const handleAdd = useCallback(() => {
    if (!canAdd) return;
    // Create empty item with default values from field definitions
    const newItem: Record<string, unknown> = {};
    for (const field of section.fields) {
      newItem[field.key] = field.defaultValue ?? "";
    }
    const withId = ensureId(newItem);
    emitChange([...items, withId]);
  }, [canAdd, section.fields, items, emitChange]);

  const handleRemove = useCallback(
    (index: number) => {
      if (!canRemove) return;
      emitChange(items.filter((_, i) => i !== index));
    },
    [canRemove, items, emitChange]
  );

  const handleMoveUp = useCallback(
    (index: number) => {
      if (index === 0) return;
      emitChange(arrayMove(items, index, index - 1));
    },
    [items, emitChange]
  );

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index === items.length - 1) return;
      emitChange(arrayMove(items, index, index + 1));
    },
    [items, emitChange]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((item) => item.__id === active.id);
      const newIndex = items.findIndex((item) => item.__id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      emitChange(arrayMove(items, oldIndex, newIndex));
    },
    [items, emitChange]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base">
              {Icon && <Icon className="size-4 text-muted-foreground" />}
              {section.label}
            </CardTitle>
            {section.description && (
              <CardDescription>{section.description}</CardDescription>
            )}
          </div>
          <span className="text-sm text-muted-foreground tabular-nums">
            {items.length}
            {maxItems != null ? ` de ${maxItems}` : ""} {section.itemLabel}
            {items.length !== 1 ? "s" : ""}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay {section.itemLabel.toLowerCase()}s todavia. Agrega uno con el
            boton de abajo.
          </p>
        )}

        {/* Desktop: DnD context */}
        <div className="hidden md:block">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((i) => i.__id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {items.map((item, index) => (
                  <SortableItemCard
                    key={item.__id}
                    item={item}
                    index={index}
                    section={section}
                    onFieldChange={handleFieldChange}
                    onRemove={handleRemove}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    isFirst={index === 0}
                    isLast={index === items.length - 1}
                    canRemove={canRemove}
                    errors={errors?.[String(index)]}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Mobile: no DnD, up/down buttons rendered inside the card */}
        <div className="md:hidden flex flex-col gap-3">
          {items.map((item, index) => (
            <SortableItemCard
              key={item.__id}
              item={item}
              index={index}
              section={section}
              onFieldChange={handleFieldChange}
              onRemove={handleRemove}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              isFirst={index === 0}
              isLast={index === items.length - 1}
              canRemove={canRemove}
              errors={errors?.[String(index)]}
            />
          ))}
        </div>

        {/* Add button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={!canAdd}
          className="w-full gap-2"
        >
          <Plus className="size-4" />
          Agregar {section.itemLabel.toLowerCase()}
        </Button>
      </CardContent>
    </Card>
  );
}
