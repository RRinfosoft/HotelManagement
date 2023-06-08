import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail";
import Login from "./Login";
import { useState, useEffect } from "react";
import { AuthProvider } from "./AuthContext";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./PrivateRoute";
import { Navigate } from "react-router-dom";
import Dashboard from "./Admin/Pages/Dashboard";
import Sidebar from "./Admin/Sidebar";
import Home from "./Admin/Pages/Catgeroy";
import Setting from "./Admin/Pages/Setting";
import Contact from "./Admin/Pages/OrderManagement";
import Products from "./Admin/Pages/Products";
import Certification from "./Admin/Pages/Certification";
import SociallyResponsive from "./Admin/Pages/SociallyResponsive";
import ProductForm from "./Admin/Pages/ProductForm";
import CertificationForm from "./Admin/Pages/CertificationForm";
import SociallyForm from "./Admin/Pages/SociallyForm";
import NavForm from "./Admin/Pages/NavForm";
import CatgeroyForm from "./Admin/Pages/CatgeroyForm";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
   <div className="App">
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/home-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <CatgeroyForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/home-form"
            element={
              <PrivateRoute>
                <Sidebar>
                  <CatgeroyForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Home />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/product-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <ProductForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/product-form"
            element={
              <PrivateRoute>
                <Sidebar>
                  <ProductForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/products"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Products />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/certification"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Certification />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/certification-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <CertificationForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/certification-form"
            element={
              <PrivateRoute>
                <Sidebar>
                  <CertificationForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/socially-responsive"
            element={
              <PrivateRoute>
                <Sidebar>
                  <SociallyResponsive />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/socially-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <SociallyForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/socially-form"
            element={
              <PrivateRoute>
                <Sidebar>
                  <SociallyForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/contact"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Contact />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/setting"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Setting />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/nav-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <NavForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/nav-form"
            element={
              <PrivateRoute>
                <Sidebar>
                  <NavForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              !currentUser?.emailVerified ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !currentUser?.emailVerified ? (
                <Register />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </AuthProvider>
    </Router>
    </div>
  );
}
export default App;
