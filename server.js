import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username et password obligatoires" });
  }

  try {
    const params = new URLSearchParams();
    params.append("client_id", "admin-cli");
    params.append("username", "admin");
    params.append("password", "admin");
    params.append("grant_type", "password");

    const tokenRes = await axios.post(
      "http://localhost:8080/realms/master/protocol/openid-connect/token",
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    const accessToken = tokenRes.data.access_token;

    await axios.post(
      "http://localhost:8080/admin/realms/master/users",
      {
        username,
        firstName,
        lastName,
        email,
        enabled: true,
        credentials: [{ type: "password", value: password, temporary: false }],
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    const userRes = await axios.get(
      `http://localhost:8080/admin/realms/master/users?username=${username}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    const userId = userRes.data[0].id;

    const rolesRes = await axios.get(
      "http://localhost:8080/admin/realms/master/roles",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    const userRole = rolesRes.data.find((r) => r.name === "user");

    if (!userRole) {
      return res
        .status(500)
        .json({ error: "Le rôle 'user' n'existe pas dans Keycloak !" });
    }

    await axios.post(
      `http://localhost:8080/admin/realms/master/users/${userId}/role-mappings/realm`,
      [{ id: userRole.id, name: userRole.name }],
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    res.json({ message: "Utilisateur créé avec succès avec le rôle 'user' !" });
  } catch (err) {
    console.error(err.response?.data || err.message);
    if (err.response?.status === 409) {
      return res.status(409).json({ error: "Utilisateur déjà existant" });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
