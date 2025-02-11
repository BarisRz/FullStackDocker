import { protectedApi } from "../protectedApi";

const createTaskGroup = async (taskGroup) => {
  const response = await protectedApi.post("/task-group", taskGroup);
  return response;
};

const getTaskGroup = async (id) => {
  const response = await protectedApi.get(`/task-group/${id}`);
  return response;
};

export { createTaskGroup, getTaskGroup };
