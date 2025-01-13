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

    console.log(typeof result.insertId);
    return result.insertId;
  }
}
module.exports = UserManager;
