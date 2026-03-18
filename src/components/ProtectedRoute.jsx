import { Navigate } from "react-router-dom";
import keycloak from "../config/keycloak";

export default function ProtectedRoute({ children, requiredRole }) {
  if (!keycloak.authenticated) {
    return <Navigate to="/" />;
  }

  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  console.log("Rôles de l'utilisateur :", roles);
  if (requiredRole && !roles.includes(requiredRole)) {
    return <Navigate to="/" />;
  }

  return children;
}
