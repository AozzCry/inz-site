import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./main/Home.jsx";
import Navbar from "./main/Navbar.jsx";
import NotFound from "./main/NotFound.jsx";

import UserInfo from "./pages/UserInfo.jsx";
import Account from "./pages/Account.jsx";
import UserContext from "./UserContext.jsx";

export default function App() {
  const { userData } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {userData.username && (
          <Route path="user" element={<UserInfo />}>
            <Route path="account" element={<Account />} />
            <Route path="orders" element={<Home />} />
            <Route path="reviews" element={<Home />} />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
