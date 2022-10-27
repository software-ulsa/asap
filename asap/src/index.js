import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import { Provider } from "react-redux";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import store from "./app/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);

reportWebVitals();
