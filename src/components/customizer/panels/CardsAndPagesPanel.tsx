"use client";

import { ControlField } from "../components/ControlField";
import { labelStyle, selectStyle } from "../types";
import type { MutableConfig, MutableStructural, MutableLayout, CustomizerLayoutOption } from "../types";

interface CardsAndPagesPanelProps {
  config: MutableConfig;
  layoutOptions: CustomizerLayoutOption[];
  updateLayout: (key: keyof MutableLayout, value: string) => void;
  updateStructural: (key: keyof MutableStructural, value: string) => void;
}

export function CardsAndPagesPanel({
  config,
  layoutOptions,
  updateLayout,
  updateStructural,
}: CardsAndPagesPanelProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <ControlField
        label="Diseño de contenido"
        field="cards.cardContentLayout"
        value={config.structural?.cardContentLayout ?? "below-image"}
        options={[
          { value: "below-image", label: "Texto debajo" },
          { value: "overlay-bottom", label: "Overlay inferior" },
          { value: "overlay-full", label: "Overlay completo" },
          { value: "side-by-side", label: "Lado a lado" },
        ]}
        onChange={(v) => updateStructural("cardContentLayout", v)}
      />

      <ControlField
        label="Estilo del héroe"
        field="structural.heroVariant"
        value={config.structural?.heroVariant ?? "full-bleed"}
        options={[
          { value: "full-bleed", label: "Pantalla completa" },
          { value: "contained", label: "Contenido" },
          { value: "split", label: "Dividido" },
          { value: "text-only", label: "Solo texto" },
        ]}
        onChange={(v) => updateStructural("heroVariant", v)}
      />

      <div>
        <label style={labelStyle}>Navegación de categorías</label>
        <select
          value={config.structural?.categoryNavStyle ?? "horizontal-scroll"}
          onChange={(e) => updateStructural("categoryNavStyle", e.target.value)}
          style={selectStyle}
        >
          <option value="horizontal-scroll">Scroll horizontal</option>
          <option value="grid">Grilla</option>
          <option value="tabs">Pestañas</option>
          <option value="chips">Chips</option>
        </select>
      </div>

      <ControlField
        label="Estilo de agregar al carrito"
        field="chrome.addToCartStyle"
        value={config.structural?.addToCartStyle ?? "full-width"}
        options={[
          { value: "full-width", label: "Botón completo" },
          { value: "icon-button", label: "Ícono" },
          { value: "floating-fab", label: "Flotante" },
          { value: "on-hover-only", label: "Al pasar el cursor" },
        ]}
        onChange={(v) => updateStructural("addToCartStyle", v)}
      />

      {layoutOptions.map(({ key, label: lLabel, options }) => (
        <div key={key}>
          <label style={labelStyle}>{lLabel}</label>
          <select
            value={config.layout[key] ?? ""}
            onChange={(e) => updateLayout(key, e.target.value)}
            style={selectStyle}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
