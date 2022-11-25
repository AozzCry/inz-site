import React, { createContext, useState } from "react";

const UserContext = createContext({
  userData: {},
  setUserData: () => {},
});

export const UserContextProvider = (props) => {
  const [userData, setUserData] = useState({
    username: null,
    email: null,
  });

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
