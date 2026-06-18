"use client";

// Search bar variant: ICON_TRIGGER
// Placeholder — renders INLINE until implemented.

import { memo } from "react";
import InlineSearchBar from "./INLINE";
import type { SearchBarSlotProps } from "./types";

const IconTriggerSearchBar = memo(function IconTriggerSearchBar(props: SearchBarSlotProps) {
  return <InlineSearchBar {...props} />;
});

export default IconTriggerSearchBar;
