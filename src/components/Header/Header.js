/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../images/cartIcon.png";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <a onClick={() => navigate("/products")} className="logo">
        TeeRex Store
      </a>
      <div className="header-right">
        <a onClick={() => navigate("/products")} className="products">
          Products
        </a>
        <img
          onClick={() => navigate("/cart")}
          className="cartIcon"
          src={cartIcon}
          alt="cart"
        />
      </div>
    </header>
  );
}
