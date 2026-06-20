import { memo } from "react";
import { EDITORIAL_REGISTRY } from "@/templates/_variants/editorial";
import type { EditorialVariant } from "@/templates/_variants/editorial";
import type { SectionRendererProps } from "./types";

export const EditorialSection = memo(function EditorialSection(props: SectionRendererProps) {
  const variant = (props.variant as EditorialVariant | undefined) ?? "DEFAULT";
  const Component = EDITORIAL_REGISTRY[variant] ?? EDITORIAL_REGISTRY.DEFAULT;
  return <Component {...props} />;
});
