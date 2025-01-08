// Initiate all managers here to remove the need to import them in each controller file
const UserManager = require("./models/UserManager");

// Create an instance of each manager
const userManager = new UserManager();

// Dont forget to export them all !
module.exports = { userManager };
