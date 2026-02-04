import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider } from "./Routes/Context/AuthContext";
import { CartProvider } from "./Routes/Context/CartContext";

import AppHeader from "./components/Layout/Header";
import AppFooter from "./components/Layout/Footer";
import SystemRoute from "./Routes/AuthRoute/SystemRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <AppHeader />
            <SystemRoute />
            <AppFooter />
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
