import React from "react";
import { Route, Routes } from "react-router-dom";
/* Constants */
import { Paths } from "constants/general"
/* Pages */
import Logo from "components/logo/Logo"
import Home from "components/home/Home"
import Chart from "components/chart/Chart"

function Navigation(props) {
    return (
        <div>
            <Routes>
                <Route path={Paths.HomePage} element={<Home />} />
                <Route path={Paths.Chart} element={<Chart />} />
                <Route path={Paths.Root} element={<Logo />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </div>
    )
}

export default Navigation