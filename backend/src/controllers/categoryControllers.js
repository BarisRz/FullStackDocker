const { categoryManager } = require("../managers");

const create = async (req, res) => {
  try {
    const { id } = req.user;
    if (!req.body.name || req.body.name.length <= 3) {
      return res.status(400).json({ error: "Name is required or too short" });
    }
    const result = await categoryManager.add(id, req.body.name);
    res.status(201).json({ id: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { create };
