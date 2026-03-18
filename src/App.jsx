import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Authentification from "./components/Authentification";
import AdminPage from "./pages/AdminPage";
import DevPage from "./pages/DevPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserPage";
import keycloak from "./config/keycloak";
import { getUserRole } from "./lib/utils/getUserRole";
import { getDisplayRole } from "./lib/utils/getDisplayRole";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  if (keycloak.authenticated) {
    const role = getUserRole(keycloak.tokenParsed);
    const displayRole = getDisplayRole();

    console.log("Rôle logique :", role);
    console.log("Rôle affiché :", displayRole);

    if (role ===  "admin") {
      navigate("/admin");
    } else if (role === "dev") {
      navigate("/dev");
    } else if (role === "com") {
      navigate("/user"); 
    }
  }
}, []);

  const handleBackHome = () => {
    setShowAuth(true); 
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <section className="bg-yellow-100 p-4">
            <p className="text-lg font-semibold">
              Commencer avec l'authentification
            </p>
            {!showAuth ? (
              <button onClick={() => setShowAuth(true)} className="">
                Sign in
              </button>
            ) : (
              <Authentification />
            )}
          </section>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage onBackHome={handleBackHome} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dev"
        element={
          <ProtectedRoute requiredRole="dev">
            <DevPage onBackHome={handleBackHome} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserPage onBackHome={handleBackHome} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
