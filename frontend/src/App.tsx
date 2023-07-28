import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SecondPage from "./pages/Second";
import ThirdPage from "./pages/PasswordChange";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface IAppProps {}

export const AuthContext = React.createContext(null);

const App: React.FunctionComponent<IAppProps> = (props) => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        {!token ? (
          <Route path="*" element={<Navigate to="/" replace />} />
        ) : (
          <>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/second" element={<SecondPage />} />
            <Route path="/password-change" element={<ThirdPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
