import { createContext, useEffect, useState } from "react";

const UserContext = createContext({
  userData: {},
  setUserData: () => {},
  cart: [],
  setCart: () => {},
});

export const UserContextProvider = (props) => {
  const [userData, setUserData] = useState({
    username: null,
    email: null,
    isAdmin: null,
  });
  const [cart, setCart] = useState(() => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        cart,
        setCart,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
