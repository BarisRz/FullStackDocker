const { adminManager } = require("../managers");

const getAllUser = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const users = await adminManager.getAllUser(page, limit);
    if (users.users.length === 0) {
      return res.sendStatus(404);
    }
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await adminManager.deleteUser(id);
    if (result === 0) {
      return res.sendStatus(404);
    }
    res.status(201).json({ deleted: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUser, deleteUser };
