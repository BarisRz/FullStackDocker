const { categoryManager } = require("../managers");

const create = async (req, res) => {
  try {
    const { id } = req.user;
    if (!req.body.name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const result = await categoryManager.add(id, req.body.name);
    res.status(201).json({ id: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { create };
