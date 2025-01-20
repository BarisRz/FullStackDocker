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
    if (result.length > 0) {
      const [update] = await this.database.query(
        `UPDATE ${this.table} SET password = ? WHERE email = ?`,
        [user.password, result[0].email]
      );
      const [deleteToken] = await this.database.query(
        `DELETE FROM password_reset WHERE token = ?`,
        [user.token]
      );
      return result[0].email;
    }
    return 0;
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
  async read(pseudo) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE pseudo = ?`,
      [pseudo]
    );
    return result;
  }

  async createRefreshToken(id, token) {
    const [result] = await this.database.query(
      `INSERT INTO refresh_token (user_id, token, expiration_date) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
      [id, token]
    );
    return result.insertId;
  }

  async verifyRefreshToken(token, id) {
    const [result] = await this.database.query(
      `SELECT * FROM refresh_token WHERE token = ? AND expiration_date > NOW() AND user_id = ?`,
      [token, id]
    );
    return result;
  }

  async deleteRefreshToken(token) {
    const [result] = await this.database.query(
      `DELETE FROM refresh_token WHERE token = ?`,
      [token]
    );
    return result.affectedRows;
  }
}

module.exports = UserManager;
