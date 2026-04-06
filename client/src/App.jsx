import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import BookingsPage from "./pages/BookingsPage";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <div className="app-shell">
        <Header />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<ListingPage />} path="/listings/:id" />
          <Route element={<BookingsPage />} path="/bookings" />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
