import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";

/* setup theme */
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import customTheme from "assets/customTheme";
// const theme = createTheme(customTheme);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        {/* <ThemeProvider theme={theme}> */}
        <App />
        {/* </ThemeProvider> */}
    </React.StrictMode>,
);

reportWebVitals();
