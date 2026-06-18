"use client";

// Bottom nav variant: DOT_INDICATOR
// TODO: implement dot-indicator variant in Phase 5
// Placeholder — renders EDGE until implemented.

import { memo } from "react";
import EdgeBottomNav from "./EDGE";
import type { BottomNavSlotProps } from "./types";

const DotIndicatorBottomNav = memo(function DotIndicatorBottomNav(props: BottomNavSlotProps) {
  return <EdgeBottomNav {...props} />;
});

export default DotIndicatorBottomNav;
