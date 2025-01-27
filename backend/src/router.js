const express = require("express");
const router = express.Router();

// Import controllers
const userControllers = require("./controllers/userControllers");
const taskControllers = require("./controllers/taskControllers");
const categoryControllers = require("./controllers/categoryControllers");
const commentControllers = require("./controllers/commentControllers");
const adminControllers = require("./controllers/adminControllers");

// Midlewares
const { inscription, hashPassword } = require("./middlewares/userInscription");
const {
  verifyPassword,
  verifyToken,
  verifyAdmin,
} = require("./middlewares/jwtToken");
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
router.delete("/user", userControllers.deleteUser);

// Task group route
router.post("/task-group", taskControllers.add);
router.get("/task-group/", taskControllers.browse);
router.get("/task-group/:id", taskControllers.read);
router.delete("/task-group/:id", taskControllers.deleteGroup);
router.put("/task-group/:id", taskControllers.updateTaskGroup);

// Task route
router.post("/task", taskControllers.addTask); // title, status, task_group_id in body
router.get("/task/:id", taskControllers.findTask); // id in params
router.get("/task-all/:group_id", taskControllers.findAllTaskFromGroup); // group_id in params
router.put("/task/:id", taskControllers.updateTask); // id in params, title, content?, expiration date?, status in body
router.delete("/task/:id", taskControllers.deleteTask); // id in params

// Category route
router.post("/category", categoryControllers.create);
router.get("/category", categoryControllers.readAll);
router.get("/category/:id", categoryControllers.read);
router.put("/category/:id", categoryControllers.update);
router.delete("/category/:id", categoryControllers.deleteCategory);

// Comment route
router.post("/comment/:id", commentControllers.create);
router.get("/comment/:id", commentControllers.readAll);
router.put("/comment/:comment_id/:task_id", commentControllers.update);
router.delete("/comment/:comment_id/:task_id", commentControllers.remove);

// Admin route
router.use(verifyAdmin);
router.get("/admin/user", adminControllers.getAllUser); // page and limit in query like /admin/user?page=1&limit=10
router.delete("/admin/user/:id", adminControllers.deleteUser); // id of user in params

module.exports = router;
