const express = require("express");
const router = express.Router();

// Import controllers
const userControllers = require("./controllers/userControllers");

// Midlewares
const { inscription, hashPassword } = require("./middlewares/userInscription");
const { sendMail, emailConfirmation } = require("./middlewares/mailling");

// API routes
router.post(
  "/inscription",
  emailConfirmation,
  sendMail,
  inscription,
  hashPassword,
  userControllers.add
);

router;

module.exports = router;
