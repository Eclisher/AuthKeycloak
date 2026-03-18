import { UserInfo } from "../components/UserInfo";
import { getUserRole } from "../lib/utils/getUserRole";
export default function DevPage({onBackHome}: {onBackHome: () => void}) {
    const roleName = getUserRole();
  return (
    <div className="bg-green-100 p-4">
      <h1>Welcome {roleName}</h1>
      <p>Vous êtes connecté en tant que développeur.</p>
      <UserInfo />
        <button
            onClick={onBackHome}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
                Back Home
            </button>
    </div>
  );
}
