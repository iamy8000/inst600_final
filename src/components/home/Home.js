import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
/* Constants */
import { Paths } from "constants/general"

function Home(props) {
    const navigate = useNavigate()

    const goChart = ()=> {
        navigate(Paths.Chart)
    }
    
    return (
        <div>
            This is homePage
            <button onClick={goChart}>
                Go to Chart Page!
            </button>
        </div>
    )
}

export default Home