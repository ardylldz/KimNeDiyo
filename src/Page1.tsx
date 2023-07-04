import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import SecondPage from './pages/Second';
import ThirdPage from './pages/Third';



export interface IPage1Props {};


const Page1: React.FunctionComponent<IPage1Props> = props => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="second" element={<SecondPage />} />
            <Route path="third" element={<ThirdPage />} />

            </Routes> 
   </BrowserRouter>);
};

export default Page1;