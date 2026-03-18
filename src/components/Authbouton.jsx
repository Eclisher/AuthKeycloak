import keycloak from "../config/keycloak";

export default function Authbouton() {
 const handleLogin = () => {
    keycloak.login(); 
  };

  return (
    <button
      onClick={handleLogin}
    >
      Login
    </button>
);
}

