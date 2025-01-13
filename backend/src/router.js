const express = require("express");
const router = express.Router();

// Import controllers
const userControllers = require("./controllers/userControllers");

// Midlewares
const { inscription, hashPassword } = require("./middlewares/userInscription");

// API routes
router.post("/inscription", inscription, hashPassword, userControllers.add);

module.exports = router;
