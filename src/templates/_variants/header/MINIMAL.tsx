"use client";

// Header variant: MINIMAL
// TODO: implement minimal variant in Phase 5
// Placeholder — renders DEFAULT until implemented.

import { memo } from "react";
import DefaultHeader from "./DEFAULT";
import type { HeaderSlotProps } from "./types";

const MinimalHeader = memo(function MinimalHeader(props: HeaderSlotProps) {
  return <DefaultHeader {...props} />;
});

export default MinimalHeader;
