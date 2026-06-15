"use client";

import { selectStyle, labelStyle } from "../types";

interface ControlFieldProps {
  label: string;
  field: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}

export function ControlField({ label, field: _field, value, options, onChange }: ControlFieldProps) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={selectStyle}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
