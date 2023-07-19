import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home";
import SecondPage from "./pages/Second";
import ThirdPage from "./pages/PasswordChange";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

export interface IAppProps {
}

export const AuthContext = React.createContext(null);

const App: React.FunctionComponent<IAppProps> = (props) => {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                {!token
                    ? (
                        <Route path='*' element={<Navigate to='/login' replace/>}/>
                    )
                    : (
                        <>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/second" element={<SecondPage/>}/>
                            <Route path="/password-change" element={<ThirdPage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                        </>
                    )}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
