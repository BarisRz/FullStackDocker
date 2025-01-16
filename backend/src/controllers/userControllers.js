const { userManager } = require("../managers");

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

const passwordResetRequest = async (req, res) => {
  const user = req.body;
  try {
    const insertedId = await userManager.forgottenPassword(user);
    res.status(201).json({ id: insertedId });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

module.exports = { add, emailConfirmation, userById, passwordResetRequest };
