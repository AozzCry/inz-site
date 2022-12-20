import { createContext, useEffect, useState } from "react";

const Context = createContext({
  userData: {},
  setUserData: () => {},
  cart: [],
  setCart: () => {},
  SBHandler: {},
  setSB: () => {},
});

export const ContextProvider = (props) => {
  const [SBHandler, setSB] = useState({ open: false, message: "" });
  const [userData, setUserData] = useState({
    username: null,
    email: null,
    isAdmin: null,
    userId: null,
  });
  const [cart, setCart] = useState(() => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Context.Provider
      value={{
        userData,
        setUserData,
        cart,
        setCart,
        SBHandler,
        setSB,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
