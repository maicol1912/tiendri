"use client";

interface CustomizerHeaderProps {
  templateLabel?: string;
  onReset?: () => void;
  onClose?: () => void;
}

export function CustomizerHeader({ templateLabel, onReset, onClose }: CustomizerHeaderProps) {
  return (
    <div
      style={{
        padding: "16px 20px",
        borderBottom: "1px solid #2a2a2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        background: "#1a1a1a",
        zIndex: 10,
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: "14px", color: "#fff" }}>Personalizador</div>
        {templateLabel && (
          <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>{templateLabel}</div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {onReset && (
          <button
            onClick={onReset}
            style={{
              padding: "5px 10px",
              background: "#2a2a2a",
              border: "1px solid #3a3a3a",
              borderRadius: "6px",
              color: "#ccc",
              cursor: "pointer",
              fontSize: "11px",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#333"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#2a2a2a"; }}
          >
            Restablecer
          </button>
        )}

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Cerrar personalizador"
            style={{
              width: "28px",
              height: "28px",
              background: "transparent",
              border: "1px solid #3a3a3a",
              borderRadius: "6px",
              color: "#888",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s, color 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "#2a2a2a";
              btn.style.color = "#e5e5e5";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "transparent";
              btn.style.color = "#888";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
