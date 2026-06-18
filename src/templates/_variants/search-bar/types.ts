export interface SearchBarSlotProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export type SearchBarVariant = "INLINE" | "ICON_TRIGGER";
