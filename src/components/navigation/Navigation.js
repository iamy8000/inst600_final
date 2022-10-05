import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Navigation.css"
/* Constants */
import { Paths } from "constants/general"

/* Pages */
import Intro from "components/intro/Intro"

function Navigation(props) {
    return (
        <div className="App">
            <Routes>
                <Route path={Paths.Root} element={<Intro />} />
            </Routes>
        </div>
    )
}

export default Navigation