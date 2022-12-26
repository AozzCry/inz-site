import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import Home from "./main/Home.jsx";
import Navbar from "./main/Navbar.jsx";
import NotFoundPage from "./main/NotFoundPage.jsx";

import Products from "./product/Products.jsx";
import Cart from "./product/Cart.jsx";
import Checkout from "./neworder/Checkout.jsx";

import AdminMenu from "./admin/AdminMenu.jsx";
import CreateProduct from "./admin/CreateProduct.jsx";
import ManageCategories from "./admin/ManageCategories.jsx";
import ManageUsers from "./admin/ManageUsers.jsx";
import ManageOrders from "./admin/ManageOrders.jsx";

import Account from "./user/Account.jsx";
import UserMenu from "./user/UserMenu.jsx";
import Orders from "./user/Orders.jsx";

import Context from "./utils/Context.jsx";
import ProductDetails from "./product/ProductDetails.jsx";

import ConfirmDialog from "./components/ConfirmDialog.jsx";
import Notification from "./components/Notification.jsx";

import ReactGA from "react-ga4";
ReactGA.initialize("G-FTZT9S8YSY");

export default function App() {
  const { userData } = useContext(Context);

  return (
    <>
      <BrowserRouter>
        <Container disableGutters sx={{ minHeight: "100vh" }}>
          <Navbar />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="product" element={<Products />} />
            <Route path="product/:nameLink" element={<ProductDetails />} />

            <Route path="cart" element={<Cart />} />
            {userData.username && !userData.isAdmin && (
              <Route path="checkout" element={<Checkout />} />
            )}
            {userData.isAdmin && (
              <Route path="admin" element={<AdminMenu />}>
                <Route path="createproduct" element={<CreateProduct />} />
                <Route path="categories" element={<ManageCategories />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="orders" element={<ManageOrders />} />
              </Route>
            )}

            {userData.username && !userData.isAdmin && (
              <Route path="user" element={<UserMenu />}>
                <Route path="account" element={<Account />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            )}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
      <ConfirmDialog />
      <Notification />
    </>
  );
}
