const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { userManager } = require("../managers");

const verifyPassword = async (req, res, next) => {
  try {
    const [utilisateur] = await userManager.read(req.body.pseudo);
    if (!utilisateur) {
      return res
        .status(400)
        .send("Utilisateur ou mot de passe incorrect, veuillez réessayer.");
    }

    if (await argon2.verify(utilisateur.password, req.body.password)) {
      delete utilisateur.password;
      req.user = { ...utilisateur }; // Assigner directement les propriétés de l'utilisateur à req.user
      next();
    } else {
      return res
        .status(401)
        .send("Mot de passe incorrect, veuillez réessayer.");
    }
  } catch (err) {
    return res.status(500).send("Erreur serveur, veuillez réessayer.");
  }
};
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token missing");
  }

  jwt.verify(token, process.env.ACCESS_APP_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = { ...user };
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("You are not allowed to access this resource");
  }
  next();
};

module.exports = { verifyPassword, verifyToken, verifyAdmin };
