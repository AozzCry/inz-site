import { Box, Container, ThemeProvider } from '@mui/material';
import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { darkTheme, lightTheme } from './utils/themes.jsx';

import Footer from './main/Footer.jsx';
import Home from './main/Home.jsx';
import Navbar from './main/Navbar.jsx';
import NotFoundPage from './main/NotFoundPage.jsx';

import Cart from './cart/Cart.jsx';
import Checkout from './neworder/Checkout.jsx';

import Products from './search/Search.jsx';

import AdminMenu from './admin/AdminMenu.jsx';
import ManageCategories from './admin/ManageCategories.jsx';
import ManageOrders from './admin/ManageOrders.jsx';
import ManageUsers from './admin/ManageUsers.jsx';
import CreateProduct from './admin/ProductForm.jsx';

import Account from './user/Account.jsx';
import Orders from './user/Orders.jsx';
import UserMenu from './user/UserMenu.jsx';

import ProductDetails from './product/ProductDetails.jsx';
import Context from './utils/Context.jsx';

import ConfirmDialog from './components/ConfirmDialog.jsx';
import Notification from './components/Notification.jsx';
import Faq from './main/Faq.jsx';

export default function App() {
  const { userData, theme } = useContext(Context);

  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Container
          disableGutters
          sx={{ minHeight: '100vh', position: 'relative' }}
        >
          <Box sx={{ pb: 5 }}>
            <Navbar />
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="faq" element={<Faq />} />

              <>
                {userData.username && !userData.isAdmin && (
                  <Route path="checkout" element={<Checkout />} />
                )}
                {userData.username && !userData.isAdmin && (
                  <Route path="user/account" element={<Account />} />
                )}
                <Route path="product/:nameLink" element={<ProductDetails />} />
              </>

              <Route path="search" element={<Products />} />
              <Route path="product/:nameLink" element={<ProductDetails />} />

              <Route path="cart" element={<Cart />} />
              {userData.username && !userData.isAdmin && (
                <Route path="checkout" element={<Checkout />} />
              )}
              {userData.isAdmin && (
                <Route path="admin" element={<AdminMenu />}>
                  <Route path="productform" element={<CreateProduct />} />
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
          </Box>
          {userData.username && !userData.isAdmin && <Footer />}
        </Container>
      </BrowserRouter>
      <ConfirmDialog />
      <Notification />
    </ThemeProvider>
  );
}
