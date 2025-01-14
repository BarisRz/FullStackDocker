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

module.exports = { add, emailConfirmation };
