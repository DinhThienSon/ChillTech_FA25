import HomePage from "../../Page/Customer/HomePage";
import ProductList from "../../Page/Customer/ProductList";
import LoginPage from "../../Page/Customer/LoginPage";
import RegisterPage from "../../Page/Customer/RegisterPage";
import ProductDetail from "../../Page/Customer/ProductDetail";
import Cart from "../../Page/Customer/Cart";
import About from "../../Page/Customer/AboutUs";

export const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/about",
    element: <About />,
  },
];

export const guestRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export const customerRoutes = [
  {
    path: "/cart",
    element: <Cart />,
  },
];

export const adminRoutes = [
  
];
