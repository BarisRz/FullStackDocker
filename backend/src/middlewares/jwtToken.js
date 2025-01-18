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
      req.user = utilisateur;
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

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyPassword, verifyToken };
