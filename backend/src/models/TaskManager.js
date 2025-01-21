const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "task" });
  }
  async readAll(id) {
    const [list] = await this.database.query(
      `SELECT * FROM task_group WHERE user_id = ?`,
      [id]
    );
    return list;
  }

  async read(id) {
    const [task_group] = await this.database.query(
      `SELECT * FROM task_group WHERE id = ?`,
      [id]
    );
    return task_group;
  }

  async create(body) {
    const [result] = await this.database.query(
      `INSERT INTO task_group (user_id, name, is_public) VALUES (?,?,?)`,
      [body.id, body.name, body.is_public]
    );
    return result.insertId;
  }

  async updateTaskGroup(id, body) {
    const [result] = await this.database.query(
      `UPDATE task_group SET name = ?, is_public = ? WHERE id = ?`,
      [body.name, body.is_public, id]
    );
    return result.affectedRows;
  }

  async deleteTaskGroup(id) {
    const [result] = await this.database.query(
      `DELETE FROM task_group WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }

  async createTask(task) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, title, content, status, expiration_date, task_group_id) VALUES (?,?,?,?,?,?)`,
      [
        task.user_id,
        task.title,
        task.content,
        task.status,
        task.expiration_date,
        task.task_group_id,
      ]
    );
    return result.insertId;
  }

  async readTask(id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }

  async readAllTaskFromGroup(group_id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE task_group_id = ?`,
      [group_id]
    );
    return result;
  }

  async updateTask(id, body) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, content = ?, status = ?, expiration_date = ? WHERE id = ?`,
      [body.title, body.content, body.status, body.expiration_date, id]
    );
    return result.affectedRows;
  }
}

module.exports = TaskManager;
