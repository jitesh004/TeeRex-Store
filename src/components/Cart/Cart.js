import React from "react";
import Row from "../Row/Row";
import Column from "../Column/Column";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import "./cart.css";

export default function Cart() {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const totalPrice = useSelector((state) => state.cartReducer.totalPrice);

  return (
    <Row>
      <Column col={12}>
        <div className="shoppingCart">Shopping Cart</div>
      </Column>
      <Column col={12}>
        <Row>
          {cartItems && cartItems.length
            ? cartItems.map((prod, index) => (
                <Column key={`prod_${index}`} col={12} sm={true}>
                  <Card key={`prod_${prod.id}`} isCart={true} product={prod} />
                </Column>
              ))
            : "No items in your shopping cart"}
        </Row>
      </Column>
      <Column col={12}>
        <div className="totalPrice">Total price: Rs. {totalPrice}</div>
      </Column>
    </Row>
  );
}
