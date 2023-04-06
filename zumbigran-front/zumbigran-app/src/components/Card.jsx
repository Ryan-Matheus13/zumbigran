import React from "react";

import "./Card.css";
import logo from "../assets/images/logo.png";

export default function Card({ children }) {
  return (
    <div className="card-container">
      <div className="logo-container">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
}
