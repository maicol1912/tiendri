'use client'

import * as React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DraggableAttributes,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/shared/utils'

interface SortableItemRenderProps {
  isDragging: boolean
  listeners: ReturnType<typeof useSortable>['listeners']
  attributes: DraggableAttributes | undefined
}

interface SortableItem {
  id: string
}

interface SortableListProps<T extends SortableItem> {
  items: T[]
  onReorder: (orderedIds: string[]) => void
  renderItem: (item: T, props: SortableItemRenderProps) => React.ReactNode
}

interface SortableRowProps<T extends SortableItem> {
  item: T
  renderItem: (item: T, props: SortableItemRenderProps) => React.ReactNode
}

function SortableRow<T extends SortableItem>({ item, renderItem }: SortableRowProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {renderItem(item, { isDragging, listeners, attributes })}
    </div>
  )
}

export function DragHandle({
  listeners,
  attributes,
  className,
}: {
  listeners: ReturnType<typeof useSortable>['listeners']
  attributes: DraggableAttributes | undefined
  className?: string
}) {
  return (
    <button
      type="button"
      className={cn(
        'hidden md:flex cursor-grab active:cursor-grabbing items-center justify-center rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      aria-label="Arrastrar para reordenar"
      {...listeners}
      {...attributes}
    >
      <GripVertical className="size-4" />
    </button>
  )
}

export function SortableList<T extends SortableItem>({
  items,
  onReorder,
  renderItem,
}: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((item) => item.id === active.id)
    const newIndex = items.findIndex((item) => item.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = arrayMove(items, oldIndex, newIndex)
    onReorder(reordered.map((item) => item.id))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const reordered = arrayMove(items, index, index - 1)
    onReorder(reordered.map((item) => item.id))
  }

  const moveDown = (index: number) => {
    if (index === items.length - 1) return
    const reordered = arrayMove(items, index, index + 1)
    onReorder(reordered.map((item) => item.id))
  }

  return (
    <>
      {/* Desktop: DnD */}
      <div className="hidden md:block">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <SortableRow key={item.id} item={item} renderItem={renderItem} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Mobile: up/down arrows */}
      <div className="md:hidden flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <div className="flex flex-col gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                aria-label="Mover arriba"
              >
                <ChevronUp className="size-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                aria-label="Mover abajo"
              >
                <ChevronDown className="size-3" />
              </Button>
            </div>
            <div className="flex-1">
              {renderItem(item, {
                isDragging: false,
                listeners: undefined,
                attributes: undefined,
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
