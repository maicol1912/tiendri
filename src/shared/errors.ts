import type { ActionResult } from '@/types/domain'

export const ErrorCode = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  SLUG_TAKEN: 'SLUG_TAKEN',
  PLAN_LIMIT: 'PLAN_LIMIT',
  STORAGE_ERROR: 'STORAGE_ERROR',
  STORAGE_UPLOAD_FAILED: 'STORAGE_UPLOAD_FAILED',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  MAX_IMAGES_REACHED: 'MAX_IMAGES_REACHED',
  MEDIA_NOT_FOUND: 'MEDIA_NOT_FOUND',
  MAX_MEDIA_REACHED: 'MAX_MEDIA_REACHED',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
} as const

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode]

export function firstValidationError<T>(
  result: { success: false; error: { issues: Array<{ message: string; path: PropertyKey[] }> } }
): ActionResult<T> {
  const firstIssue = result.error.issues[0]
  const field = typeof firstIssue?.path[0] === 'string' ? firstIssue.path[0] : undefined
  return {
    success: false,
    error: {
      code: ErrorCode.VALIDATION_ERROR,
      message: firstIssue?.message ?? 'Datos inválidos.',
      field,
    },
  }
}

export function wrapDatabaseError<T>(err: unknown): ActionResult<T> {
  const message = err instanceof Error ? err.message : 'Error desconocido'
  return {
    success: false,
    error: { code: ErrorCode.DATABASE_ERROR, message },
  }
}

export function isPlanLimitError(message: string): boolean {
  return /_(LIMIT|EXCEEDED)$/i.test(message)
}
