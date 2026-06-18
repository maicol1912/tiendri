"use client";

// Header variant: GREETING
// TODO: extract from decor-warm in Phase 5
// Placeholder — renders DEFAULT until implemented.

import { memo } from "react";
import DefaultHeader from "./DEFAULT";
import type { HeaderSlotProps } from "./types";

const GreetingHeader = memo(function GreetingHeader(props: HeaderSlotProps) {
  return <DefaultHeader {...props} />;
});

export default GreetingHeader;
