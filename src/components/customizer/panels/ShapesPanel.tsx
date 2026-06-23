"use client";

import { ControlField } from "../components/ControlField";
import { labelStyle, selectStyle } from "../types";
import type { MutableConfig, MutableRadius, MutableLayout } from "../types";
import { parseRadius } from "../utils";

interface ShapesPanelProps {
  config: MutableConfig;
  updateRadius: (key: keyof MutableRadius, value: string) => void;
  updateLayout: (key: keyof MutableLayout, value: string) => void;
}

export function ShapesPanel({ config, updateRadius, updateLayout }: ShapesPanelProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {(
        [
          { key: "card" as const, label: "Esquinas de tarjetas", max: 24 },
          { key: "category" as const, label: "Esquinas de categorías", max: 30 },
          { key: "button" as const, label: "Esquinas de botones", max: 24 },
        ]
      ).map(({ key, label: rLabel, max }) => {
        const numVal = parseRadius(config.radius[key]);
        return (
          <div key={key}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ color: "#aaa", fontSize: "12px" }}>{rLabel}</label>
              <span style={{ color: "#666", fontSize: "11px" }}>{numVal}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={max}
              value={numVal}
              onChange={(e) => updateRadius(key, `${e.target.value}px`)}
              style={{ width: "100%", accentColor: "var(--customizer-accent)" }}
            />
          </div>
        );
      })}

      <div style={{ borderTop: "1px solid var(--customizer-border)", paddingTop: "12px" }}>
        <ControlField
          label="Escala de bordes"
          field="chrome.borderRadiusScale"
          value={config.layout.borderRadiusScale ?? "md"}
          options={[
            { value: "sharp", label: "Sin redondeo" },
            { value: "xs", label: "Mínimo" },
            { value: "sm", label: "Pequeño" },
            { value: "md", label: "Mediano" },
            { value: "lg", label: "Grande" },
            { value: "xl", label: "Extra grande" },
            { value: "pill", label: "Píldora" },
          ]}
          onChange={(v) => updateLayout("borderRadiusScale", v)}
        />
      </div>

      <ControlField
        label="Tratamiento del borde"
        field="cards.cardBorderTreatment"
        value={config.layout.cardBorderTreatment ?? "none"}
        options={[
          { value: "none", label: "Sin borde" },
          { value: "subtle", label: "Sutil" },
          { value: "prominent", label: "Prominente" },
          { value: "left-accent", label: "Acento izquierdo" },
          { value: "top-accent", label: "Acento superior" },
        ]}
        onChange={(v) => updateLayout("cardBorderTreatment", v)}
      />

      <ControlField
        label="Radio de imagen"
        field="cards.imageBorderRadius"
        value={config.layout.imageBorderRadius ?? "same-as-card"}
        options={[
          { value: "same-as-card", label: "Igual a la tarjeta" },
          { value: "none", label: "Sin bordes" },
          { value: "rounded", label: "Redondeado" },
          { value: "circle", label: "Circular" },
        ]}
        onChange={(v) => updateLayout("imageBorderRadius", v)}
      />

      <div>
        <label style={labelStyle}>Estilo de separadores</label>
        <select
          value={config.layout.dividerStyle ?? "none"}
          onChange={(e) => updateLayout("dividerStyle", e.target.value)}
          style={selectStyle}
        >
          <option value="none">Sin separador</option>
          <option value="line">Línea</option>
          <option value="dots">Puntos</option>
          <option value="dash">Guiones</option>
        </select>
      </div>
    </div>
  );
}
