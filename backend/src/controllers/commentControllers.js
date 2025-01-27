const { commentManager } = require("../managers");

const create = async (req, res) => {
  const { id } = req.user;
  const task_id = req.params.id;
  try {
    const comment = req.body.comment?.trim();
    if (!comment) {
      return res.status(404).json({ error: "Comment can't be empty" });
    }
    const insertId = await commentManager.add(id, task_id, comment);
    res.status(201).json({ insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const readAll = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await commentManager.browse(id);
    if (comments.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { comment_id, task_id } = req.params;
  const user_id = req.user.id;
  const comment = req.body.comment?.trim();
  if (!comment) {
    return res.status(404).json({ error: "Comment can't be empty" });
  }
  try {
    const result = await commentManager.edit(
      user_id,
      task_id,
      comment_id,
      comment
    );
    if (result === 0) {
      return res.sendStatus(404);
    }
    res.status(201).json({ updated: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { comment_id, task_id } = req.params;
  const user_id = req.user.id;
  try {
    const result = await commentManager.delete(comment_id, task_id, user_id);
    if (result === 0) {
      return res.sendStatus(404);
    }
    res.status(201).json({ deleted: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, readAll, update, remove };
