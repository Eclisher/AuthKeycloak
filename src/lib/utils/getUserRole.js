import keycloak from "../../config/keycloak";

export function getUserRole(user) {
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  console.log("Rôles de l'utilisateur :", roles);
  if (roles.includes("dev")) {
    return "dev";
  } else if (roles.includes("admin")) {
    return "admin";
  } else {
    return "user";
  }
}