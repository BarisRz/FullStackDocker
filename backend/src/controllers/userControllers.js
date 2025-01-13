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

module.exports = { add };
