const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async getAllUser() {
    const [users] = await this.database.query(`SELECT * FROM ${this.table}`);
    return users;
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, email, password) values (?, ?, ?)`,
      [user.pseudo, user.email, user.password]
    );
    return result.insertId;
  }

  async emailConfirmation(user) {
    const [result] = await this.database.query(
      `INSERT INTO email_confirmation (user_pseudo, token, expiration_date) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))`,
      [user.pseudo, user.token]
    );
    return result.insertId;
  }
}
module.exports = UserManager;
