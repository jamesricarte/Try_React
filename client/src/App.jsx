import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import PrivateRoute from "./components/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
