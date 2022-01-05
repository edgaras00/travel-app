import React, { useState } from "react";

const AppContext = React.createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || {}
  );

  const addToCart = (tour) => {
    const shoppingCart = { ...cart };
    if (tour.tourID in shoppingCart) {
      shoppingCart[tour.tourID].quantity++;
      shoppingCart[tour.tourID].totalPrice += tour.price;
    } else {
      shoppingCart[tour.tourID] = {
        image: tour.image,
        name: tour.name,
        price: tour.price,
        totalPrice: tour.price,
        quantity: 1,
      };
    }
    setCart(shoppingCart);
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
  };

  const removeTourFromCart = (tourID) => {
    const shoppingCart = { ...cart };
    if (tourID in shoppingCart) {
      if (shoppingCart[tourID].quantity > 1) {
        shoppingCart[tourID].quantity--;
        shoppingCart[tourID].totalPrice -= shoppingCart[tourID].price;
      } else if (shoppingCart[tourID].quantity === 1) {
        delete shoppingCart[tourID];
      }
    }
    setCart(shoppingCart);
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
  };

  const removeAll = (tourID) => {
    const shoppingCart = { ...cart };
    if (tourID in shoppingCart) {
      delete shoppingCart[tourID];
    }
    setCart(shoppingCart);
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
  };

  const clearCart = () => {
    setCart({});
    localStorage.removeItem("cart");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeTourFromCart,
        removeAll,
        clearCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
