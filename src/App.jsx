import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import About from "./pages/About/About";
import Gallery from "./pages/Gallery/Gallery";
import Shop from "./pages/Shop/Shop";
import Checkout from "./components/Checkout/Checkout";
import React from "react";
import ProductPage from "./components/ProductPage/ProductPage";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { CartProvider } from "./hooks/ShoppingCart/CartContext.jsx";
import MyOrders from "./components/MyOrders/MyOrders.jsx";
import Account from "./pages/Account/Account.jsx";
import {
  AuthProvider,
  useAuth,
} from "./hooks/Context/AuthContext/AuthContext.jsx";
import Layout from "./components/Layout/Layout.jsx";
import { ContactUs } from "./pages/ContactUs/ContactUs.jsx";
import PrivateRoute from "./hooks/PrivateRoute/PrivateRoute.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import AdminLogin from "./components/Forms/AdminLogin/AdminLogin.jsx";
import ManageCustomers from "./components/Dashboard/ManageCustomers/ManageCustomers.jsx";
import EditCustomer from "./components/Dashboard/ManageCustomers/EditCustomer.jsx";
import ManageProducts from "./components/Dashboard/ManageProducts/ManageProducts.jsx";
import EditProduct from "./components/Dashboard/ManageProducts/EditProduct.jsx";
import AddProduct from "./components/Dashboard/ManageProducts/AddProduct.jsx";
import ManageOrders from "./components/Dashboard/ManageOrders/ManageOrders.jsx";
import ManageReviews from "./components/Dashboard/ManageReviews/ManageReviews.jsx";
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shopping" element={<Shop />} />
            <Route path="/shopping/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route
              path="/myAccount"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <PrivateRoute>
                  <ManageCustomers />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/customers/edit/:id"
              element={<EditCustomer />}
            />
            <Route
              path="/admin/products"
              element={
                <PrivateRoute>
                  <ManageProducts />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/products/edit/:id"
              element={
                <PrivateRoute>
                  <EditProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <PrivateRoute>
                  <ManageOrders />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <PrivateRoute>
                  <ManageReviews />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
