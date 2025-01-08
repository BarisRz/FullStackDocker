const express = require("express");
const router = express.Router();

// Import controllers
const movieControllers = require("./controllers/movieControllers");

// API routes
router.get("/users", movieControllers.userReadAll);

module.exports = router;
