const express = require("express");
const router = express.Router();

// Import controllers
const userControllers = require("./controllers/userControllers");
const taskControllers = require("./controllers/taskControllers");
const categoryControllers = require("./controllers/categoryControllers");

// Midlewares
const { inscription, hashPassword } = require("./middlewares/userInscription");
const { verifyPassword, verifyToken } = require("./middlewares/jwtToken");
const {
  sendMail,
  emailConfirmation,
  tokenGeneration,
  sendMailPasswordReset,
} = require("./middlewares/mailling");

// API routes

/* User route */
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
router.get(
  "/password-reset",
  tokenGeneration,
  sendMailPasswordReset,
  userControllers.passwordResetRequest
); // email in body
router.post("/password-reset", hashPassword, userControllers.passwordReseting); // token in body, and new password in body
router.post("/login", verifyPassword, userControllers.login); // pseudo, password in body
router.get("/logout", userControllers.logout);
router.get("/refresh", userControllers.handleRefreshToken);

// Protected route
router.use(verifyToken);

// User route
router.put("/user/password", hashPassword, userControllers.changePassword); // password in body
router.get("/user/:id", userControllers.userById); // id in params

// Task group route
router.post("/task-group", taskControllers.add);
router.get("/task-group/", taskControllers.browse);
router.get("/task-group/:id", taskControllers.read);
router.delete("/task-group/:id", taskControllers.deleteGroup);
router.put("/task-group/:id", taskControllers.updateTaskGroup);

// Task route
router.post("/task", taskControllers.addTask);
router.get("/task/:id", taskControllers.findTask);
router.get("/task-all/:group_id", taskControllers.findAllTaskFromGroup);
router.put("/task/:id", taskControllers.updateTask);
router.delete("/task/:id", taskControllers.deleteTask);

// Category route
router.post("/category", categoryControllers.create);
router.get("/category", categoryControllers.readAll);
router.get("/category/:id", categoryControllers.read);
router.put("/category/:id", categoryControllers.update);
router.delete("/category/:id", categoryControllers.deleteCategory);

module.exports = router;
