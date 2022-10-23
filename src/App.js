import React, { Suspense } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
/* Containers */
import Navigation from 'components/navigation/Navigation';

function App() {
    return (
        <div>
            <Suspense fallback={<div />}>
                <BrowserRouter>
                    <Navigation />
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
