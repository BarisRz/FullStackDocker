const { userManager } = require("../managers");

const userReadAll = async (req, res) => {
  try {
    const users = await userManager.getAllUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { userReadAll };
