// Initiate all managers here to remove the need to import them in each controller file
const UserManager = require("./models/UserManager");
const TaskManager = require("./models/TaskManager");
const CategoryManager = require("./models/CategoryManager");
const CommentManager = require("./models/CommentManager");
const AdminManager = require("./models/AdminManager");

// Create an instance of each manager
const userManager = new UserManager();
const taskManager = new TaskManager();
const categoryManager = new CategoryManager();
const commentManager = new CommentManager();
const adminManager = new AdminManager();

// Dont forget to export them all !
module.exports = {
  userManager,
  taskManager,
  categoryManager,
  commentManager,
  adminManager,
};
