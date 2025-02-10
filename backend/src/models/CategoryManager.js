const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  async browse(user_id) {
    const [categories] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [user_id]
    );
    return categories;
  }

  async read(id, user_id) {
    const [category] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ? and user_id = ?`,
      [id, user_id]
    );
    return category;
  }

  async edit(id, name, user_id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ? AND user_id = ?`,
      [name, id, user_id]
    );
    return result.affectedRows;
  }

  async add(user_id, name) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, name) VALUES (?, ?)`,
      [user_id, name]
    );
    return result.insertId;
  }

  async delete(id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );
    return result.affectedRows;
  }
}

module.exports = CategoryManager;
