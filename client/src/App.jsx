import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import BookingsPage from "./pages/BookingsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import WishlistPage from "./pages/WishlistPage";

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <div className="app-shell">
          <Header />
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<ForgotPasswordPage />} path="/forgot-password" />
            <Route element={<ResetPasswordPage />} path="/reset-password/:token" />
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<WishlistPage />} path="/wishlist" />
            <Route element={<ListingPage />} path="/listings/:id" />
            <Route element={<BookingsPage />} path="/bookings" />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
