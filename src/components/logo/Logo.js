import React, { useState } from 'react';
import "./Logo.css"
import { useNavigate } from "react-router-dom";
/* Components */
import Button from "@mui/material/Button";
/* Constants */
import { Paths } from "constants/general"

const logoOptions = [
    "https://content.sportslogos.net/logos/32/743/full/maryland_terrapins_logo_primary_20052066.png",
    "https://1000logos.net/wp-content/uploads/2021/06/Maryland-Terrapins-logo.png",
    "https://content.sportslogos.net/logos/32/743/full/maryland_terrapins_logo_primary_dark_20127886.png",
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Maryland_terrapins_logo.png",
    "https://www.mfri.org/static/img/2018-UM-GLOBE-LOGO.39cd36f3e321.gif",
    "https://i.pinimg.com/originals/64/cc/68/64cc681d1f97b4a19879203f1ae697e1.jpg",
    "https://www.umd.edu/sites/umd.edu/files/Coronavirus/Icon%20-%203000x3000%20white%20smaller.png",
    "https://cdn.worldvectorlogo.com/logos/university-of-maryland.svg",
]

function Intro(props) {
    const navigate = useNavigate();
    const [umdLogo, setUmdLogo] = useState(logoOptions[0])

    const goChart = () => {
        navigate(Paths.Chart)
    }

    return (
        <header className="App-header">
            <img src={umdLogo} className="App-logo" alt="logo" />
            <p>
                Yating's React App for Final Project.
            </p>
            <Button
                variant='contained'
                onClick={goChart}
            >
                Click to go to chart page
            </Button>
        </header>
    )
}

export default Intro