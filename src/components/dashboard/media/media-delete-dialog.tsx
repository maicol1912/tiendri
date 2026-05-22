'use client';

import { ConfirmDialog } from '@/components/shared';

interface MediaDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filename: string;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function MediaDeleteDialog({
  open,
  onOpenChange,
  filename,
  onConfirm,
  isDeleting = false,
}: MediaDeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="¿Eliminar imagen?"
      description={`Vas a eliminar "${filename}". Esta acción no se puede deshacer. Las referencias a esta imagen en tu tienda quedarán sin imagen.`}
      confirmText="Eliminar"
      cancelText="Cancelar"
      onConfirm={onConfirm}
      variant="destructive"
      loading={isDeleting}
    />
  );
}
