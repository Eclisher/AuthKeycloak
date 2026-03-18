import keycloak from "../config/keycloak";

export default function RegisterBouton() {
 const handleRegister = () => {
    keycloak.register(); 
  };

  return (
    <button
      onClick={handleRegister}
    >
      Register
    </button>
);
}