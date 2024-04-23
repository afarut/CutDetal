import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import createStore from 'react-auth-kit/createStore';
import AuthProvider from "react-auth-kit";
import reportWebVitals from "./reportWebVitals";

const domain = window.location.hostname

if (domain === "calc.cutdetal.ru") {
  document.title = "CutDetal"
} else {
  document.title = "CUTL"
}

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
