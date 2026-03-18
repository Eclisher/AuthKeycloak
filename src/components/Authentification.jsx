import Authbouton from "./Authbouton";
import RegisterForm from "./RegisterForm";
import { UserInfo } from "./UserInfo";

export default function Authentification() {
    return (
      <>
        <h1>Keycloak Authentication with React</h1>
        <Authbouton />
        <UserInfo />
        <RegisterForm />
      </>
    );
}