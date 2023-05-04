import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import "../../styles/cartItem.css";
const CartItem = ({ id, image, name, price, quantity, totalPrice }) => {
  const { addToCart, removeTourFromCart, removeAll } = useContext(AppContext);
  return (
    <div className="cart-item">
      <div className="cart-item-content">
        <div className="item-description">
          <div className="item-image">
            <img src={image} alt="shopping item" />
          </div>
          <div className="item-text">
            <div className="item-title">{name}</div>
            <div className="quantity-container">
              <div className="item-quantity">{quantity}</div>
              <div className="quantity-controller">
                <span onClick={() => addToCart({ tourID: id, price })}>+</span>
                <span onClick={() => removeTourFromCart(id)}>-</span>
                <span onClick={() => removeAll(id)}>x</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item-price">${totalPrice}</div>
      </div>
      <hr className="cart-item-hr" />
    </div>
  );
};

export default CartItem;
