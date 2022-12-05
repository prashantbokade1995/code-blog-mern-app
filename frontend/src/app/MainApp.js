import React from 'react'
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const MainApp = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  )
}

export default MainApp
