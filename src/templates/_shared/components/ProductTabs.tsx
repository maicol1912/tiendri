'use client';

// Shared Product Detail Tabs / Accordion component
// Used by all 8 templates on their product detail pages.
// First item is open by default; clicking an open item collapses it.
// Styling is 100% via CSS variables (--t-*) so it adapts to every template.

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface ProductDetailTab {
  label: string;
  content: string;
}

interface ProductTabsProps {
  tabs: ProductDetailTab[];
}

export function ProductTabs({ tabs }: ProductTabsProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div
      className="divide-y"
      style={{ borderColor: 'var(--t-border)' }}
    >
      {tabs.map((tab, index) => (
        <div key={index} style={{ borderColor: 'var(--t-border)' }}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="w-full flex items-center justify-between py-4 text-left bg-transparent border-none cursor-pointer"
            aria-expanded={openIndex === index}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: 'var(--t-foreground)' }}
            >
              {tab.label}
            </span>
            <ChevronDown
              className="w-4 h-4 shrink-0 transition-transform duration-200"
              style={{
                color: 'var(--t-muted)',
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              aria-hidden="true"
            />
          </button>
          {openIndex === index && (
            <div
              className="pb-4 text-sm leading-relaxed"
              style={{ color: 'var(--t-muted)' }}
            >
              {tab.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
