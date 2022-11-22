import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./main/Home.jsx";
import Navbar from "./main/Navbar.jsx";
import NotFound from "./main/NotFound.jsx";

import UserInfo from "./pages/UserInfo.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
