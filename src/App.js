import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/products" element={<Products />} key="products" />
        <Route exact path="/cart" element={<Cart />} key="cart" />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </div>
  );
}

export default App;
