import { UserInfo } from "../components/UserInfo";
import { getDisplayRole } from "../lib/utils/getDisplayRole";
export default function ComPage({onBackHome}: {onBackHome: () => void}) {
  const roleName = getDisplayRole();
  return (
    <div className="bg-gray-100 p-4">
      <h1>Welcome {roleName}</h1>
      <p>Vous êtes connecté en tant qu'utilisateur.</p>
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
