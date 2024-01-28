import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-lnacf2pxir6xfgy3.us.auth0.com"
      clientId="HtpNSDm4ZtCXYDvq64NC3T8vt2dqYTRH"
      redirect_uri={window.location.origin}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://localhost:3000",
      }}
      scope="openid email profile"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
