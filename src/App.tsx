import "./App.css";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products.tsx";
import Login from "./pages/Login.tsx";
import Cart from "./pages/Cart.tsx";
import Navbar from "./components/Navbar.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import AuthRoute from "./utils/AuthRoute.tsx";
import Profile from "./pages/Profile.tsx";
import ManageProducts from "./pages/ManageProduct.tsx";
import Register from "./pages/Register.tsx";
function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <AuthRoute>
                <Profile />
              </AuthRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <AuthRoute>
                <Cart />
              </AuthRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
