const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { userManager } = require("../managers");

const verifyPassword = async (req, res, next) => {
  try {
    const [utilisateur] = await userManager.read(req.body.pseudo);
    if (!utilisateur) {
      res
        .status(400)
        .send("Utilisateur ou mot de passe incorrect, veuillez réessayer.");
    }

    if (await argon2.verify(utilisateur.password, req.body.password)) {
      delete utilisateur.password;
      req.user = utilisateur;
      next();
    } else {
      res.status(401).send("Mot de passe incorrect, veuillez réessayer.");
    }
  } catch (err) {
    res.status(500).send("Erreur serveur, veuillez réessayer.");
  }
};

module.exports = { verifyPassword };
