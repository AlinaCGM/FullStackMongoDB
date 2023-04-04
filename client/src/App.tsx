import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Footer from "./components/footer/Footer";
import NavBar from "./components/navBar/NavBar";
import UserInformation from "./components/userInformation/UserInformation";
import Home from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import Products from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import MyWishList from "./pages/wishList/MyWishList";
import ProductDetailItem from "./components/productDetail/ProductDetailItem";
import SignUp from "./pages/login/SignUp";
import Orders from "./pages/order/Orders";

// https://mobilic-back-end.onrender.com/
function App() {
  return (
    <Box className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shoppingCart" element={<Cart />}></Route>
        <Route path="/wishList" element={<MyWishList />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route
          path="/products/:productId"
          element={<ProductDetailItem />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/user" element={<UserInformation />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
