'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ColumnDefinition<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  columns: ColumnDefinition<T>[]
  data: T[]
  emptyState?: React.ReactNode
  loading?: boolean
  onRowClick?: (row: T) => void
  getRowKey?: (row: T, index: number) => string
}

const SKELETON_ROWS = 5

function TableSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <>
      {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-4 w-full max-w-[200px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

function MobileCardSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <>
      {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4"
        >
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <div key={colIndex} className="flex justify-between gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

function getCellValue<T>(row: T, column: ColumnDefinition<T>): React.ReactNode {
  if (column.render) return column.render(row)
  const value = (row as Record<string, unknown>)[column.key]
  if (value === null || value === undefined) return '—'
  return String(value)
}

export function DataTable<T>({
  columns,
  data,
  emptyState,
  loading = false,
  onRowClick,
  getRowKey,
}: DataTableProps<T>) {
  const resolveKey = (row: T, index: number): string => {
    if (getRowKey) return getRowKey(row, index)
    const record = row as Record<string, unknown>
    if (typeof record['id'] === 'string' || typeof record['id'] === 'number') {
      return String(record['id'])
    }
    return String(index)
  }

  const isEmpty = !loading && data.length === 0

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton columnCount={columns.length} />
            ) : isEmpty ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center">
                  {emptyState ?? (
                    <span className="text-muted-foreground text-sm">
                      Sin datos para mostrar
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={resolveKey(row, index)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(onRowClick && 'cursor-pointer')}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {getCellValue(row, col)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden flex flex-col gap-3">
        {loading ? (
          <MobileCardSkeleton columnCount={columns.length} />
        ) : isEmpty ? (
          <div className="py-10 text-center">
            {emptyState ?? (
              <span className="text-muted-foreground text-sm">
                Sin datos para mostrar
              </span>
            )}
          </div>
        ) : (
          data.map((row, index) => (
            <div
              key={resolveKey(row, index)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                'flex flex-col gap-3 rounded-lg border border-border bg-card p-4',
                onRowClick && 'cursor-pointer active:bg-muted/50'
              )}
            >
              {columns.map((col) => (
                <div key={col.key} className="flex items-start justify-between gap-4">
                  <span className="text-xs font-medium text-muted-foreground shrink-0">
                    {col.header}
                  </span>
                  <span className={cn('text-sm text-foreground text-right', col.className)}>
                    {getCellValue(row, col)}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  )
}
