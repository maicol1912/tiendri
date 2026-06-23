"use client";

import { fontPairs as globalFontPairs, fontGroups } from "@/shared/fonts";
import { ControlField } from "../components/ControlField";
import { selectStyle, labelStyle } from "../types";
import type { MutableConfig, MutableTypography, CustomizerFontPair } from "../types";

interface TypographyPanelProps {
  config: MutableConfig;
  onConfigChange: (config: MutableConfig) => void;
  updateTypography: (key: keyof MutableTypography, value: string | number) => void;
  /** Template-specific font pair subset (keys must match shared/fonts.ts). Falls back to all global font pairs when omitted. */
  fontPairs?: CustomizerFontPair[];
}

export function TypographyPanel({ config, onConfigChange, updateTypography, fontPairs }: TypographyPanelProps) {
  // When template-specific pairs are provided, render a flat list using their labels.
  // Fall back to the global grouped registry when no override is given.
  const defaultFontPairKey = fontPairs ? (fontPairs[0]?.key ?? "minimalista") : "minimalista";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label style={labelStyle}>Estilo de fuente</label>
        {fontPairs ? (
          // Schema-driven flat list: one card per template font pair
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {fontPairs.map((pair) => {
              const globalPair = globalFontPairs[pair.key];
              const isSelected = (config.fontPair ?? defaultFontPairKey) === pair.key;
              return (
                <button
                  key={pair.key}
                  type="button"
                  onClick={() => onConfigChange({ ...config, fontPair: pair.key })}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "2px",
                    padding: "8px 10px",
                    background: isSelected ? "#1a2a1a" : "var(--customizer-bg-elevated)",
                    border: isSelected ? `1.5px solid var(--customizer-accent)` : "1.5px solid var(--customizer-border)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "#444";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--customizer-border)";
                  }}
                >
                  <span
                    style={{
                      fontFamily: globalPair?.heading.style.fontFamily,
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--customizer-text)",
                      lineHeight: 1.2,
                    }}
                  >
                    {pair.label}
                  </span>
                  <span
                    style={{
                      fontFamily: globalPair?.body.style.fontFamily,
                      fontSize: "11px",
                      color: "#666",
                      lineHeight: 1.3,
                    }}
                  >
                    {pair.heading} + {pair.body}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          // Global fallback: grouped registry with all 15 font pairs
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {fontGroups.map((group) => (
              <div key={group.id}>
                <div style={{ fontSize: "10px", color: "var(--customizer-text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontWeight: 600 }}>
                  {group.name}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {group.pairs.map((pairId) => {
                    const pair = globalFontPairs[pairId];
                    if (!pair) return null;
                    const isSelected = (config.fontPair ?? "minimalista") === pairId;
                    return (
                      <button
                        key={pairId}
                        type="button"
                        onClick={() => onConfigChange({ ...config, fontPair: pairId })}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "2px",
                          padding: "8px 10px",
                          background: isSelected ? "#1a2a1a" : "var(--customizer-bg-elevated)",
                          border: isSelected ? `1.5px solid var(--customizer-accent)` : "1.5px solid var(--customizer-border)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          textAlign: "left",
                          width: "100%",
                          transition: "border-color 0.15s, background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "#444";
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--customizer-border)";
                        }}
                      >
                        <span style={{ fontFamily: pair.heading.style.fontFamily, fontSize: "14px", fontWeight: 600, color: "var(--customizer-text)", lineHeight: 1.2 }}>
                          {pair.name}
                        </span>
                        <span style={{ fontFamily: pair.body.style.fontFamily, fontSize: "11px", color: "#666", lineHeight: 1.3 }}>
                          {pair.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ borderTop: "1px solid var(--customizer-border)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={labelStyle}>Peso del título</label>
          <select
            value={config.theme?.typography?.headingWeight ?? 700}
            onChange={(e) => updateTypography("headingWeight", Number(e.target.value))}
            style={selectStyle}
          >
            <option value={400}>Fino (400)</option>
            <option value={500}>Regular (500)</option>
            <option value={600}>Semibold (600)</option>
            <option value={700}>Bold (700)</option>
            <option value={800}>Extrabold (800)</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Tamaño del título</label>
          <select
            value={config.theme?.typography?.headingScale ?? "xl"}
            onChange={(e) => updateTypography("headingScale", e.target.value)}
            style={selectStyle}
          >
            <option value="md">Compacto</option>
            <option value="lg">Normal</option>
            <option value="xl">Grande</option>
            <option value="2xl">Muy grande</option>
          </select>
        </div>

        <ControlField
          label="Mayúsculas"
          field="typography.headingTransform"
          value={config.theme?.typography?.headingTransform ?? "none"}
          options={[
            { value: "none", label: "Normal" },
            { value: "uppercase", label: "MAYÚSCULAS" },
          ]}
          onChange={(v) => updateTypography("headingTransform", v)}
        />

        <ControlField
          label="Espaciado del título"
          field="typography.headingSpacing"
          value={config.theme?.typography?.headingSpacing ?? "normal"}
          options={[
            { value: "tight", label: "Compacto" },
            { value: "normal", label: "Normal" },
            { value: "wide", label: "Amplio" },
          ]}
          onChange={(v) => updateTypography("headingSpacing", v)}
        />

        <div>
          <label style={labelStyle}>Tamaño del texto</label>
          <select
            value={config.theme?.typography?.bodyFontSize ?? "base"}
            onChange={(e) => updateTypography("bodyFontSize", e.target.value)}
            style={selectStyle}
          >
            <option value="sm">Pequeño</option>
            <option value="base">Normal</option>
            <option value="lg">Grande</option>
          </select>
        </div>

        <ControlField
          label="Peso del texto"
          field="typography.bodyFontWeight"
          value={String(config.theme?.typography?.bodyFontWeight ?? 400)}
          options={[
            { value: "300", label: "Ligero" },
            { value: "400", label: "Normal" },
            { value: "500", label: "Medio" },
          ]}
          onChange={(v) => updateTypography("bodyFontWeight", Number(v))}
        />

        <ControlField
          label="Contraste de tamaño"
          field="typography.fontSizeContrast"
          value={config.theme?.typography?.fontSizeContrast ?? "medium"}
          options={[
            { value: "low", label: "Sutil" },
            { value: "medium", label: "Medio" },
            { value: "high", label: "Alto" },
            { value: "extreme", label: "Extremo" },
          ]}
          onChange={(v) => updateTypography("fontSizeContrast", v)}
        />
      </div>
    </div>
  );
}
