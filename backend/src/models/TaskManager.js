const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "tasks" });
  }
  async getTaskGroup(id) {
    const [list] = await this.database.query(
      `SELECT * FROM task_group WHERE id = ?`,
      [id]
    );

    return list;
  }

  async createTaskGroup(body) {
    const [result] = await this.database.query(
      `INSERT INTO task_group (user_id, name, is_public) VALUES (?,?,?)`
    );
  }
}

module.exports = TaskManager;
