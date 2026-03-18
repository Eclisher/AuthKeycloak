import keycloak from "../config/keycloak";
export function UserInfo() {
  if (!keycloak.authenticated) return null;

  return (
    <div>
      <p>Connecté en tant que : {keycloak.tokenParsed?.preferred_username}</p>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
}
