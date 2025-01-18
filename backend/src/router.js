const express = require("express");
const router = express.Router();

// Import controllers
const userControllers = require("./controllers/userControllers");

// Midlewares
const { inscription, hashPassword } = require("./middlewares/userInscription");
const {
  sendMail,
  emailConfirmation,
  tokenGeneration,
  sendMailPasswordReset,
} = require("./middlewares/mailling");
const { verifyPassword, verifyToken } = require("./middlewares/jwtToken");

// API routes
router.post(
  "/inscription",
  tokenGeneration,
  emailConfirmation,
  sendMail,
  inscription,
  hashPassword,
  userControllers.add
); // pseudo, email, password in body

router.get("/verify-email", userControllers.emailConfirmation); // Token in body

router.get("/user/:id", userControllers.userById); // id in params

router.get(
  "/password-reset",
  tokenGeneration,
  sendMailPasswordReset,
  userControllers.passwordResetRequest
); // email in body

router.post("/password-reset", hashPassword, userControllers.passwordReseting); // token in body, and new password in body
router.post("/login", verifyPassword, userControllers.login); // pseudo, password in body
router.get("/refresh", userControllers.handleRefreshToken);
// router.get("/test", verifyToken, (req, res) => {
//   res.status(200).send("Route Test");
// });

// Protected route
// router.use(verifyToken);
// router.get("/protected-route" /*, userControllers.protectedRoute*/);

module.exports = router;
