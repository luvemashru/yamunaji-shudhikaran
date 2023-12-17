import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './view/home/home';
import AboutPage from './view/about/about';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/yamunaji-shudhikaran" element={<HomePage/>} />
                <Route path="/about" element={<AboutPage/>} />
            </Routes>
        </BrowserRouter>
    )
}