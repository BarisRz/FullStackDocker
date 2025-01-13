const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "tasks" });
  }
}

module.exports = TaskManager;
