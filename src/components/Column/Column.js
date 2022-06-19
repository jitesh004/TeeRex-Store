import React from "react";
import "./column.css";

export default function Column({ children, col, sm }) {
  return <div className={`col-${col} ${sm ? "col-sm" : ""}`}>{children}</div>;
}
