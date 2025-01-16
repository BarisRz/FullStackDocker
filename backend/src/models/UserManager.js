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

  async verifyEmail(token) {
    const [result] = await this.database.query(
      `SELECT * FROM email_confirmation WHERE token = ? AND expiration_date > NOW()`,
      [token]
    );
    if (result.length > 0) {
      const [update] = await this.database.query(
        `UPDATE ${this.table} SET email_verified = 1 WHERE pseudo = ?`,
        [result[0].user_pseudo]
      );
      const [deleteToken] = await this.database.query(
        `DELETE FROM email_confirmation WHERE token = ?`,
        [token]
      );
      return result[0].user_pseudo;
    }
    return 0;
  }

  async forgottenPassword(user) {
    const [result] = await this.database.query(
      `INSERT INTO password_reset (email, token, expiration_date) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))`,
      [user.email, user.token]
    );
    return result.insertId;
  }

  async verifyPasswordToken(user) {
    const [result] = await this.database.query(
      `SELECT * FROM password_reset WHERE token = ? AND expiration_date > NOW()`,
      [user.token]
    );
    return result;
  }

  async updatePassword(user) {
    const [result] = await this.database.query(
      `UPDATE users SET password = ? WHERE email = ?`,
      [user.password, user.email]
    );
    return result.affectedRows;
  }

  async readId(id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}
module.exports = UserManager;
