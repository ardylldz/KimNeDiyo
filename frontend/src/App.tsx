import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home";
import SecondPage from "./pages/Second";
import ThirdPage from "./pages/Third";
import FourthPage from "./pages/Fourth";
import LoginPage from "./pages/Login";

export interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="second" element={<SecondPage/>}/>
                <Route path="third" element={<ThirdPage/>}/>
                <Route path="fourth" element={<FourthPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
