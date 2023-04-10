import React from "react";

import "./Input.css";

export default function Input({
  label,
  type,
  placeholder,
  style,
  onchange,
  value,
}) {
  return (
    <div className="input-container" style={style}>
      <label>{label}</label>
      <input
        onChange={(e) => {
          console.log(e.target.value)
          onchange(e.target.value);
        }}
        value={value}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
