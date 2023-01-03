import { createContext, useEffect, useMemo, useState } from "react";

const Context = createContext();

export const ContextProvider = (props) => {
  const [theme, setTheme] = useState(false);
  const [snackBar, setSnackBar] = useState({
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

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    text: "",
    afterConfirm: null,
  });

  function confirm(text, afterConfirm) {
    setConfirmDialog({ open: true, text, afterConfirm });
  }

  function notify(message, severity = "success") {
    setSnackBar({ open: true, message, severity });
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,

      userData,
      setUserData,

      cart,
      setCart,

      snackBar,
      setSnackBar,
      notify,

      confirmDialog,
      setConfirmDialog,
      confirm,
    }),
    [theme, userData, cart, snackBar, confirmDialog]
  );
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Context;
