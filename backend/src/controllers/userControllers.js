const { userManager } = require("../managers");
const jwt = require("jsonwebtoken");

const add = async (req, res) => {
  const user = req.body;
  try {
    const insertedId = await userManager.create(user);
    res.status(201).json({ id: insertedId });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const emailConfirmation = async (req, res) => {
  const { token } = req.body;
  try {
    const result = await userManager.verifyEmail(token);
    if (result === 0) {
      res.status(404).json({ error: "Token not found or expired" });
    } else {
      res.status(201).json({ message: `Email confirmed for ${result}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const passwordReseting = async (req, res) => {
  const user = req.body;
  try {
    const result = await userManager.verifyPasswordToken(user);
    if (result === 0) {
      res.status(404).json({ error: "Token not found or expired" });
    }
    res.status(201).json({ message: `Password reset for ${result}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const passwordResetRequest = async (req, res) => {
  const user = req.body;
  try {
    const insertedId = await userManager.forgottenPassword(user);
    res.status(201).json({ id: insertedId });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const userById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userManager.readId(id);
    delete user[0].password;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = req.user;
    const LorgaToken = jwt.sign({ user }, process.env.APP_SECRET, {
      expiresIn: "10d",
    });
    res.cookie("LorgaToken", LorgaToken, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  add,
  emailConfirmation,
  userById,
  passwordResetRequest,
  passwordReseting,
  login,
};
