const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async getAllUser(page = 1, limit = 10) {
    const offset = (Number(page) - 1) * Number(limit);

    const [users] = await this.database.query(
      `SELECT id, pseudo, email, creation_date, role, email_verified 
       FROM ${this.table} 
       LIMIT ? OFFSET ?`,
      [Number(limit), Number(offset)]
    );

    const [totalCount] = await this.database.query(
      `SELECT COUNT(*) as total FROM ${this.table}`
    );

    return {
      users,
      total: totalCount[0].total,
      limitPerPage: Number(limit),
      totalPages: Math.ceil(totalCount[0].total / limit),
      currentPage: Number(page),
    };
  }

  async deleteUser(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = AdminManager;
