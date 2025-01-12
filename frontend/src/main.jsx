import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN} // Replace with your Auth0 domain
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID} // Replace with your Auth0 client ID
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </StrictMode>
);
