import React, { useState } from "react";
import {
  addItemToCart,
  deleteItemFromCart,
  removeItemFromCart,
} from "../../redux/actions/cart.action";
import { useSelector, useDispatch } from "react-redux";
import Row from "../Row/Row";
import Column from "../Column/Column";
import "./card.css";

export default function Card(props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const [showError, setError] = useState(false);
  const { product, isCart } = props;
  const { imageURL, name, price, quantity, id } = product;
  const item = cartItems.find((prod) => prod.id === id);
  const [qty, setQty] = useState(item ? item.qty : 0);

  const increaseQty = (argQty = 0) => {
    if (quantity <= qty) {
      setError(true);
    } else {
      if (showError) {
        setError(false);
      }
      setQty(argQty + 1);
      product.qty = argQty + 1;
      dispatch(addItemToCart(product));
    }
  };

  const decreaseQty = (argQty) => {
    if (showError) {
      setError(false);
    }
    setQty(argQty - 1);
    product.qty = argQty - 1;
    dispatch(deleteItemFromCart(product));
  };

  const deleteItem = () => {
    dispatch(removeItemFromCart(product));
  };

  return (
    <div className="card">
      <Row>
        {showError ? (
          <div className="error">
            You cannot add more than {quantity} quantity.
          </div>
        ) : null}
        <Column col={isCart ? 2 : 12}>
          <img className="productImage" src={imageURL} alt="productImage" />
        </Column>
        <Column col={isCart ? 4 : 12}>
          <Row>
            <div className="container">
              <Column col={12}>
                <h4>
                  <b>{name}</b>
                </h4>
              </Column>
              <Column col={12}>
                <Row>
                  <Column col={5} sm={true}>
                    <div className="price">Rs. {price} </div>
                  </Column>
                  {!qty ? (
                    <Column col={7} sm={true}>
                      <button
                        onClick={() => increaseQty()}
                        className="addToCartButton"
                      >
                        Add to cart
                      </button>
                    </Column>
                  ) : null}
                  {qty ? (
                    <Column col={7} sm={true}>
                      <button className="qtyButton">
                        <span
                          onClick={() => decreaseQty(qty)}
                          className="minusPlus"
                        >
                          -
                        </span>
                        {qty}
                        <span
                          onClick={() => increaseQty(qty)}
                          className="minusPlus"
                          disabled={showError}
                        >
                          +
                        </span>
                      </button>
                    </Column>
                  ) : null}
                  {isCart ? (
                    <Column col={7}>
                      <button
                        className="delete"
                        onClick={() => deleteItem(qty)}
                      >
                        {" "}
                        Delete Item
                      </button>
                    </Column>
                  ) : null}
                </Row>
              </Column>
            </div>
          </Row>
        </Column>
      </Row>
    </div>
  );
}
