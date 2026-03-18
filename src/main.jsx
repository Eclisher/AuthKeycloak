import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import keycloak from "./config/keycloak";
import { BrowserRouter } from "react-router-dom";
keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
  if (authenticated) {
    console.log("Utilisateur connecté :", keycloak.tokenParsed);
    ReactDOM.createRoot(document.getElementById("root")).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  } else {
    console.log("Non authentifié");
  }
});
