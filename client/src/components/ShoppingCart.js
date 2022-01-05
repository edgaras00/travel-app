import React, { useContext } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../context/appContext";
import "../styles/shoppingCart.css";

const ShoppingCart = () => {
  const { cart } = useContext(AppContext);

  const cartItems = Object.keys(cart).map((itemID) => {
    return (
      <CartItem
        key={itemID}
        image={cart[itemID].image}
        name={cart[itemID].name}
        price={cart[itemID].price}
        quantity={cart[itemID].quantity}
        id={itemID}
        totalPrice={cart[itemID].totalPrice}
      />
    );
  });

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
        </div>
        <hr className="cart-hr" />
        <div className="cart-items">{cartItems}</div>
      </div>
    </div>
  );
};

export default ShoppingCart;
