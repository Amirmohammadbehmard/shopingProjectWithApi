import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import { ShopingCartProvider } from "./context/ShopingCartContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Login from "./pages/login/Login";
import LoginProvider from "./context/LoginContext";
import Contact from "./pages/contact/Contact";
import Search from "./pages/search/Search";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/notFound/NotFound";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import SignUp from "./pages/signUp/SignUp";

function App() {
  return (
    <LoginProvider>
      <ShopingCartProvider>
        <Layout>
          <Routes>
            <Route path="/shopingProjectWithApi/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/notfound" />} />
          </Routes>
        </Layout>
      </ShopingCartProvider>
    </LoginProvider>
  );
}

export default App;
