"use client";

import { useState } from "react";
import { ControlField } from "../components/ControlField";
import { labelStyle, selectStyle, STYLE_LABELS } from "../types";
import type { MutableConfig, MutableColor, CustomizerColorField, CustomizerPalette } from "../types";

interface ColorsPanelProps {
  config: MutableConfig;
  colorFields: CustomizerColorField[];
  palettes?: CustomizerPalette[];
  selectedPaletteId: string | undefined;
  updateColor: (key: string, value: string) => void;
  applyPalette: (palette: CustomizerPalette) => void;
  updateColorToken: (key: keyof MutableColor, value: string) => void;
}

export function ColorsPanel({
  config,
  colorFields,
  palettes,
  selectedPaletteId,
  updateColor,
  applyPalette,
  updateColorToken,
}: ColorsPanelProps) {
  const [showAdvancedColors, setShowAdvancedColors] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {palettes && palettes.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {palettes.map((palette) => {
            const isSelected = selectedPaletteId === palette.id;
            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => applyPalette(palette)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 10px",
                  background: isSelected ? "#1e2d1e" : "var(--customizer-bg-elevated)",
                  border: isSelected ? `1.5px solid var(--customizer-accent)` : "1.5px solid var(--customizer-border)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.15s, background 0.15s",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "#444";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--customizer-border)";
                }}
              >
                <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
                  {palette.preview.map((color, i) => (
                    <div key={i} style={{ width: "16px", height: "32px", borderRadius: "4px", backgroundColor: color, border: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }} />
                  ))}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--customizer-text)", marginBottom: "2px" }}>{palette.name}</div>
                  <div style={{ display: "inline-block", fontSize: "10px", color: "var(--customizer-text-muted)", background: "var(--customizer-border)", borderRadius: "99px", padding: "1px 6px" }}>
                    {STYLE_LABELS[palette.style] ?? palette.style}
                  </div>
                </div>
                {isSelected && (
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--customizer-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {(!palettes || palettes.length === 0) && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {colorFields.map(({ key, label: colorLabel }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
              <label style={{ color: "#aaa", flex: 1, fontSize: "12px" }}>{colorLabel}</label>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#666", fontSize: "11px", fontFamily: "monospace" }}>
                  {(config.colors[key] ?? "#000000").toUpperCase()}
                </span>
                <input type="color" value={config.colors[key] ?? "#000000"} onChange={(e) => updateColor(key, e.target.value)} style={{ width: "28px", height: "28px", border: "1px solid var(--customizer-border-hover)", borderRadius: "6px", cursor: "pointer", padding: "1px", background: "transparent" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {palettes && palettes.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setShowAdvancedColors((prev) => !prev)}
            style={{
              marginTop: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "8px 10px",
              background: "transparent",
              border: "1px dashed #333",
              borderRadius: "8px",
              color: "var(--customizer-text-dim)",
              fontSize: "11px",
              cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = "var(--customizer-accent)";
              btn.style.color = "#aaa";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = "#333";
              btn.style.color = "var(--customizer-text-dim)";
            }}
          >
            <span>Personalizar colores individuales</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: showAdvancedColors ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}>
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showAdvancedColors && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px", background: "var(--customizer-bg-elevated)", borderRadius: "8px", border: "1px solid var(--customizer-border)" }}>
              <p style={{ fontSize: "10px", color: "var(--customizer-text-dim)", margin: 0, lineHeight: 1.4 }}>
                Ajustá colores individuales sobre la paleta seleccionada.
              </p>
              {colorFields.map(({ key, label: colorLabel }) => (
                <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                  <label style={{ color: "#aaa", flex: 1, fontSize: "12px" }}>{colorLabel}</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#666", fontSize: "11px", fontFamily: "monospace" }}>
                      {(config.colors[key] ?? "#000000").toUpperCase()}
                    </span>
                    <input type="color" value={config.colors[key] ?? "#000000"} onChange={(e) => updateColor(key, e.target.value)} style={{ width: "28px", height: "28px", border: "1px solid var(--customizer-border-hover)", borderRadius: "6px", cursor: "pointer", padding: "1px", background: "transparent" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: "8px", borderTop: "1px solid var(--customizer-border)", paddingTop: "12px" }}>
        <ControlField
          label="Estrategia de color"
          field="color.colorStrategy"
          value={config.theme?.color?.colorStrategy ?? "accent-pop"}
          options={[
            { value: "monotone", label: "Monotono" },
            { value: "duotone", label: "Duotono" },
            { value: "accent-pop", label: "Acento pop" },
            { value: "gradient", label: "Gradiente" },
          ]}
          onChange={(v) => updateColorToken("colorStrategy", v)}
        />
      </div>

      <ControlField
        label="Tratamiento del fondo"
        field="color.backgroundTreatment"
        value={config.theme?.color?.backgroundTreatment ?? "solid"}
        options={[
          { value: "solid", label: "Sólido" },
          { value: "subtle-gradient", label: "Gradiente sutil" },
          { value: "pattern", label: "Patrón" },
        ]}
        onChange={(v) => updateColorToken("backgroundTreatment", v)}
      />

      <ControlField
        label="Fondo de tarjetas"
        field="color.cardBackground"
        value={config.theme?.color?.cardBackground ?? "white"}
        options={[
          { value: "white", label: "Blanco" },
          { value: "surface", label: "Superficie" },
          { value: "transparent", label: "Transparente" },
          { value: "primary-tint", label: "Tinte primario" },
        ]}
        onChange={(v) => updateColorToken("cardBackground", v)}
      />

      <div>
        <label style={labelStyle}>Efecto hover de imagen</label>
        <select
          value={config.theme?.color?.imageOverlayHover ?? "none"}
          onChange={(e) => updateColorToken("imageOverlayHover", e.target.value)}
          style={selectStyle}
        >
          <option value="none">Sin efecto</option>
          <option value="dark-scrim">Oscurecer</option>
          <option value="color-tint">Tinte de color</option>
          <option value="blur">Desenfoque</option>
        </select>
      </div>

      <ControlField
        label="Distribución del acento"
        field="color.accentDistribution"
        value={config.theme?.color?.accentDistribution ?? "badges-and-buttons"}
        options={[
          { value: "buttons-only", label: "Solo botones" },
          { value: "badges-and-buttons", label: "Badges y botones" },
          { value: "everywhere", label: "En todas partes" },
          { value: "minimal", label: "Mínimo" },
        ]}
        onChange={(v) => updateColorToken("accentDistribution", v)}
      />
    </div>
  );
}
