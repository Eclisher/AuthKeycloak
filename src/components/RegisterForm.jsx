import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");
    setIsError(false);
    try {
      const res = await axios.post("http://localhost:4000/api/register", form);

      setMessage(res.data.message || "Utilisateur créé avec succès !");
      setForm({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setIsError(true);
      setMessage(
        err.response?.data?.error ||
          "Erreur lors de la création de l'utilisateur",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded space-y-3">
      <h2 className="text-xl font-semibold">Inscription</h2>

      <input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        value={form.username}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="firstName"
        placeholder="Prénom"
        value={form.firstName}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Nom"
        value={form.lastName}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? "Création..." : "S'inscrire"}
      </button>

      {message && (
        <p className={`mt-2 ${isError ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
