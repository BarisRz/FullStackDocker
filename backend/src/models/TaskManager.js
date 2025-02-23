const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "task" });
  }
  async readAll(id) {
    const request = `SELECT tg.*, COUNT(t.id) AS task_count FROM task_group tg LEFT JOIN task t ON tg.id = t.task_group_id WHERE tg.user_id = ? GROUP BY tg.id`;
    const [list] = await this.database.query(request, [id]);
    return list;
  }

  async read(id, user_id) {
    const [task_group] = await this.database.query(
      `SELECT * FROM task_group WHERE id = ? and user_id = ?`,
      [id, user_id]
    );
    return task_group;
  }

  async create(id, body) {
    const [result] = await this.database.query(
      `INSERT INTO task_group (user_id, name, is_public) VALUES (?,?,?)`,
      [id, body.name, body.is_public]
    );
    return result.insertId;
  }
  async updateTaskGroup(id, body, user_id) {
    const [result] = await this.database.query(
      `UPDATE task_group SET name = ?, is_public = ? WHERE id = ? AND user_id = ?`,
      [body.name, body.is_public, id, user_id]
    );
    if (result.affectedRows === 0) return result.affectedRows;

    const [[updatedTaskGroup]] = await this.database.query(
      `SELECT * FROM task_group WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );

    return updatedTaskGroup;
  }

  async deleteTaskGroup(id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM task_group WHERE id = ? and user_id = ?`,
      [id, user_id]
    );
    return result.affectedRows;
  }

  async createTask(id, task) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, title, content, status, expiration_date, task_group_id, priority) VALUES (?,?,?,?,?,?,?)`,
      [
        id,
        task.title,
        task.content,
        task.status,
        task.expiration_date,
        task.task_group_id,
        task.priority,
      ]
    );
    return result.insertId;
  }

  async readTask(id, user_id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ? and user_id = ?`,
      [id, user_id]
    );
    return result;
  }

  async readAllTaskFromGroup(group_id, id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE task_group_id = ? AND user_id = ?`,
      [group_id, id]
    );
    return result;
  }

  async updateTask(id, body, user_id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, content = ?, status = ?, expiration_date = ?, priority = ? WHERE id = ? AND user_id = ?`,
      [
        body.title,
        body.content,
        body.status,
        body.expiration_date,
        body.priority,
        id,
        user_id,
      ]
    );
    return result.affectedRows;
  }

  async deleteTask(id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );
    return result.affectedRows;
  }
}

module.exports = TaskManager;
