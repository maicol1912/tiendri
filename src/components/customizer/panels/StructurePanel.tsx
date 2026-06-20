"use client";

import { ControlField } from "../components/ControlField";
import { labelStyle, selectStyle } from "../types";
import type { MutableConfig, MutableLayout, MutableGrid, CustomizerGridField } from "../types";

interface StructurePanelProps {
  config: MutableConfig;
  gridFields: CustomizerGridField[];
  onConfigChange: (config: MutableConfig) => void;
  updateLayout: (key: keyof MutableLayout, value: string) => void;
  updateDensity: (value: string) => void;
  updateGrid: (section: keyof MutableGrid, breakpoint: "mobile" | "desktop", value: number) => void;
}

export function StructurePanel({
  config,
  gridFields,
  onConfigChange,
  updateLayout,
  updateDensity,
  updateGrid,
}: StructurePanelProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <label style={labelStyle}>Densidad del catálogo</label>
        <select
          value={config.layout?.gridDensity ?? "standard"}
          onChange={(e) => updateLayout("gridDensity", e.target.value)}
          style={selectStyle}
        >
          <option value="compact">Compacto</option>
          <option value="standard">Estándar</option>
          <option value="spacious">Espacioso</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Espaciado entre secciones</label>
        <select
          value={config.layout?.spacingDensity ?? "normal"}
          onChange={(e) => updateLayout("spacingDensity", e.target.value)}
          style={selectStyle}
        >
          <option value="tight">Compacto</option>
          <option value="normal">Normal</option>
          <option value="airy">Espacioso</option>
        </select>
      </div>

      <ControlField
        label="Espaciado general"
        field="layout.density"
        value={config.layoutDensity ?? "balanced"}
        options={[
          { value: "compact", label: "Compacto" },
          { value: "balanced", label: "Equilibrado" },
          { value: "spacious", label: "Espacioso" },
        ]}
        onChange={updateDensity}
      />

      <ControlField
        label="Columnas en móvil"
        field="layout.gridColumnsMobile"
        value={String(config.layout?.gridColumnsMobile ?? 2)}
        options={[
          { value: "1", label: "1 columna" },
          { value: "2", label: "2 columnas" },
        ]}
        onChange={(v) => onConfigChange({ ...config, layout: { ...config.layout, gridColumnsMobile: Number(v) as unknown as string } })}
      />

      <div>
        <label style={labelStyle}>Columnas en escritorio</label>
        <select
          value={config.layout?.gridColumnsDesktop ?? 3}
          onChange={(e) => onConfigChange({ ...config, layout: { ...config.layout, gridColumnsDesktop: Number(e.target.value) as unknown as string } })}
          style={selectStyle}
        >
          {[2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} columnas</option>
          ))}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Ancho máximo del contenedor</label>
        <select
          value={config.layout?.containerMaxWidth ?? "medium"}
          onChange={(e) => updateLayout("containerMaxWidth", e.target.value)}
          style={selectStyle}
        >
          <option value="narrow">Estrecho</option>
          <option value="medium">Mediano</option>
          <option value="wide">Amplio</option>
          <option value="full">Pantalla completa</option>
        </select>
      </div>

      <ControlField
        label="Proporción de imagen"
        field="layout.cardImageRatio"
        value={config.layout.cardImageRatio ?? "square"}
        options={[
          { value: "square", label: "Cuadrado" },
          { value: "portrait", label: "Retrato" },
          { value: "wide", label: "Panorámico" },
        ]}
        onChange={(v) => updateLayout("cardImageRatio", v)}
      />

      <div>
        <label style={labelStyle}>Relleno de tarjetas</label>
        <select
          value={config.layout.cardPadding ?? "normal"}
          onChange={(e) => updateLayout("cardPadding", e.target.value)}
          style={selectStyle}
        >
          <option value="none">Sin relleno</option>
          <option value="tight">Comprimido</option>
          <option value="normal">Normal</option>
          <option value="spacious">Espacioso</option>
        </select>
      </div>

      <ControlField
        label="Ajuste de imagen"
        field="cards.imageFit"
        value={config.layout.imageFit ?? "cover"}
        options={[
          { value: "cover", label: "Cubrir" },
          { value: "contain", label: "Contener" },
        ]}
        onChange={(v) => updateLayout("imageFit", v)}
      />

      {gridFields.length > 0 && (
        <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: "12px" }}>
          <p style={{ color: "#555", fontSize: "11px", marginBottom: "8px" }}>Columnas por sección</p>
          {gridFields.map(({ key, mobileLabel, desktopLabel }) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "8px" }}>
              {(
                [
                  { bp: "mobile" as const, bpLabel: mobileLabel },
                  { bp: "desktop" as const, bpLabel: desktopLabel },
                ]
              ).map(({ bp, bpLabel }) => (
                <div key={bp}>
                  <label style={{ display: "block", color: "#aaa", fontSize: "12px", marginBottom: "4px" }}>
                    {bpLabel}
                  </label>
                  <select
                    value={config.grid[key]?.[bp] ?? 2}
                    onChange={(e) => updateGrid(key, bp, Number(e.target.value))}
                    style={selectStyle}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "columna" : "columnas"}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
