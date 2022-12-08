import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import Home from "./main/Home.jsx";
import Navbar from "./main/Navbar.jsx";
import NotFound from "./main/NotFound.jsx";

import Products from "./product/Products.jsx";
import Cart from "./product/Cart.jsx";
import Checkout from "./order/Checkout.jsx";

import AdminMenu from "./admin/AdminMenu.jsx";
import CreateProduct from "./admin/CreateProduct.jsx";
import ManageCategories from "./admin/ManageCategories.jsx";
import ManageUsers from "./admin/ManageUsers.jsx";

import Account from "./user/Account.jsx";
import UserMenu from "./user/UserMenu.jsx";

import UserContext from "./utils/UserContext.jsx";
import Footer from "./main/Footer.jsx";

export default function App() {
  const { userData } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Container sx={{ minHeight: "80vh" }} disableGutters>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="product" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          {userData.username && !userData.isAdmin && (
            <Route path="checkout" element={<Checkout />} />
          )}
          {userData.isAdmin && (
            <Route path="admin" element={<AdminMenu />}>
              <Route path="createproduct" element={<CreateProduct />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="users" element={<ManageUsers />} />
            </Route>
          )}

          {userData.username && !userData.isAdmin && (
            <Route path="user" element={<UserMenu />}>
              <Route path="account" element={<Account />} />
              <>
                <Route path="orders" element={<NotFound />} />
                <Route path="reviews" element={<NotFound />} />
              </>
            </Route>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}
