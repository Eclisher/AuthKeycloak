import keycloak from "../../config/keycloak";

export function getDisplayRole() {
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const filteredRoles = roles.filter(
    (role) => role !== "offline_access" && role !== "uma_authorization",
  );    

  return filteredRoles[1] || "user";
}