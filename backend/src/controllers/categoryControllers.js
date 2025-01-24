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

const readAll = async (req, res) => {
  const { id } = req.user;
  try {
    const result = await categoryManager.browse(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const read = async (req, res) => {
  const { id } = req.user;
  try {
    const [result] = await categoryManager.read(req.params.id, id);
    if (!result) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.user;
  try {
    const result = await categoryManager.edit(req.params.id, req.body.name, id);
    if (!result) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.user;
  try {
    const result = await categoryManager.delete(req.params.id, id);
    if (!result) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, readAll, read, update, deleteCategory };
