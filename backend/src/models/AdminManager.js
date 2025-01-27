const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }
}

module.exports = AdminManager;
