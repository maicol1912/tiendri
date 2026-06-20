"use client";

import React from "react";
import { BestSellersSection } from "@/templates/_core/sections/BestSellersSection";
import type { BestSellersSlotProps } from "./types";

export default function BestSellersDefault({
  bestSellers,
  currencySymbol,
}: BestSellersSlotProps) {
  if (!bestSellers || bestSellers.length === 0) return null;

  return (
    <BestSellersSection
      bestSellers={bestSellers}
      currencySymbol={currencySymbol}
    />
  );
}
