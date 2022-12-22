import { createContext, useEffect, useMemo, useState } from "react";

const Context = createContext();

export const ContextProvider = (props) => {
  const [SBHandler, setSB] = useState({
    open: false,
    message: "",
    sevrity: "success",
  });

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

  function notification(message, severity = "success") {
    setSB({ open: true, message, severity });
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(
    () => ({
      userData,
      setUserData,
      SBHandler,
      setSB,
      notification,
      cart,
      setCart,
    }),
    [userData, cart, SBHandler]
  );
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Context;
