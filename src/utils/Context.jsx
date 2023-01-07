import { createContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

const Context = createContext();

export const ContextProvider = (props) => {
  const [theme, setTheme] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    sevrity: "success",
  });
  const [search, setSearch] = useState({ name: "", category: [] });

  const { data: userData, refetch: refetchUserData } = useQuery({
    queryKey: ["auth/refresh"],
    placeholderData: {
      username: null,
      email: null,
      isAdmin: null,
      userId: null,
    },
    enabled: document.cookie.length > 0,
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

      search,
      setSearch,

      userData,
      refetchUserData,

      cart,
      setCart,

      snackBar,
      setSnackBar,
      notify,

      confirmDialog,
      setConfirmDialog,
      confirm,
    }),
    [theme, search, userData, refetchUserData, cart, snackBar, confirmDialog]
  );
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Context;
