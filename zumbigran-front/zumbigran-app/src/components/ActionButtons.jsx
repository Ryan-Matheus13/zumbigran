import React from "react";

import { ImWarning } from "react-icons/im"
import { FiRefreshCw } from "react-icons/fi"
import { RiDeleteBinLine } from "react-icons/ri"
import { IoMdLocate } from "react-icons/io"

import "./ActionButtons.css"

export default function ActionButtons() {
    
  return (
    <div style={{ display: "flex", gap: 15 }}>
      <button title="Denunciar" className="action-button">
        <ImWarning />
      </button>
      <button
        style={{ backgroundColor: "#0057b7" }}
        title="Atualizar Localização"
        className="action-button"
      >
        <IoMdLocate />
      </button>
      <button
        style={{ backgroundColor: "#1faf24" }}
        title="Trocar"
        className="action-button"
      >
        <FiRefreshCw />
      </button>
      <button
        style={{ backgroundColor: "#f93854" }}
        title="Excluir"
        className="action-button"
      >
        <RiDeleteBinLine />
      </button>
    </div>
  );
}
