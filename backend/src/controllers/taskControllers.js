const { taskManager } = require("../managers");

const add = async (req, res) => {
  const taskGroup = req.body;
  try {
    const insertId = await taskManager.create(taskGroup);
    res.status(201).json({ insertId });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const read = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await taskManager.read(id);
    if (group.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(group[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const browse = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks_group = await taskManager.readAll(id);
    if (tasks_group.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(tasks_group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await taskManager.deleteTaskGroup(id);
    if (result === 0) {
      return res.sendStatus(404);
    }
    res.status(201).json({ deleted: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Task

const addTask = async (req, res) => {
  const task = req.body;
  try {
    const result = await taskManager.createTask(task);
    res.status(200).json({ insertId: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await taskManager.readTask(id);
    if (result.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findAllTaskFromGroup = async (req, res) => {
  const { group_id } = req.params;
  try {
    const result = await taskManager.readAllTaskFromGroup(group_id);
    if (result.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskGroup = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const result = await taskManager.updateTaskGroup(id, body);
    res.status(201).json({ updated: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const result = await taskManager.updateTask(id, body);
    res.status(201).json({ updated: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  add,
  read,
  browse,
  deleteGroup,
  addTask,
  findTask,
  findAllTaskFromGroup,
  updateTaskGroup,
  updateTask,
};
