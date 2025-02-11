import { protectedApi } from "../protectedApi";

const createTaskGroup = async (taskGroup) => {
  const response = await protectedApi.post("/task-group", taskGroup);
  return response;
};

export { createTaskGroup };
