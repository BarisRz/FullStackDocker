const { taskManager } = require("../managers");

const add = async (req, res) => {
  const taskGroup = req.body;
  const { id } = req.user;
  try {
    if (taskGroup.name.trim().length < 3) {
      return res
        .status(409)
        .json({ error: "Name must be at least 3 characters long" });
    }
    taskGroup.name = taskGroup.name.trim();
    const insertId = await taskManager.create(id, taskGroup);
    res.status(201).json({ insertId });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const read = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const group = await taskManager.read(id, user_id);
    if (group.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(group[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const browse = async (req, res) => {
  const { id } = req.user;
  try {
    const tasks_group = await taskManager.readAll(id);
    // if (tasks_group.length === 0) {
    //   return res.sendStatus(404);
    // }
    res.status(200).json(tasks_group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const result = await taskManager.deleteTaskGroup(id, user_id);
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
  const { id } = req.user;
  try {
    const result = await taskManager.createTask(id, task);
    res.status(200).json({ insertId: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findTask = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const result = await taskManager.readTask(id, user_id);
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
  const { id } = req.user;
  try {
    const result = await taskManager.readAllTaskFromGroup(group_id, id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskGroup = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  const body = req.body;
  try {
    if (body.name.trim().length < 3) {
      return res
        .status(409)
        .json({ error: "Name must be at least 3 characters long" });
    }
    body.name = body.name.trim();
    const result = await taskManager.updateTaskGroup(id, body, user_id);
    if (result === 0) {
      return res.sendStatus(404);
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  const body = req.body;
  try {
    const result = await taskManager.updateTask(id, body, user_id);
    res.status(201).json({ updated: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const result = await taskManager.deleteTask(id, user_id);
    if (!result) {
      return res.sendStatus(404);
    }
    res.status(201).json({ deleted: result });
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
  deleteTask,
};
