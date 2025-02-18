import { protectedApi } from "../protectedApi";

const createTaskGroup = async (taskGroup) => {
  const response = await protectedApi.post("/task-group", taskGroup);
  return response;
};

const getTaskGroup = async (id) => {
  const response = await protectedApi.get(`/task-group/${id}`);
  return response;
};

const updateTaskGroup = async (id, taskGroup) => {
  const response = await protectedApi.put(`/task-group/${id}`, taskGroup);
  return response;
};

const getTaskGroupsList = async () => {
  const response = await protectedApi.get("/task-group");
  return response;
};

export { createTaskGroup, getTaskGroup, updateTaskGroup, getTaskGroupsList };
