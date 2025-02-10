const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "user_comment" });
  }

  async browse(task_id) {
    const [comments] = await this.database.query(
      `SELECT u.pseudo, c.user_id, c.task_id, c.content, c.creation_date FROM ${this.table} c INNER JOIN users u ON u.id = c.user_id WHERE c.task_id= ?`,
      [task_id]
    );
    return comments;
  }

  async read(comment_id, task_id) {
    const [comment] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ? and task_id = ?`,
      [comment_id, task_id]
    );
    return comment;
  }

  async edit(user_id, task_id, comment_id, content) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET content = ?, creation_date = CURRENT_TIMESTAMP() WHERE id = ? AND task_id = ? AND user_id = ?`,
      [content, comment_id, task_id, user_id]
    );
    return result.affectedRows;
  }

  async add(user_id, task_id, comment) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, task_id, content) VALUES (?,?,?)`,
      [user_id, task_id, comment]
    );
    return result.insertId;
  }

  async delete(comment_id, task_id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ? AND task_id = ? and user_id = ?`,
      [comment_id, task_id, user_id]
    );
    return result.affectedRows;
  }
}

module.exports = CommentManager;
