import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "theme/customTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={CustomTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);

reportWebVitals();
