import { protectedApi } from "../protectedApi";

const createTaskGroup = async (taskGroup) => {
  const response = await protectedApi.post("/task-group", taskGroup);
  return response;
};

const getTaskGroup = async (id) => {
  const response = await protectedApi.get(`/task-group/${id}`);
  return response.data;
};

const updateTaskGroup = async (id, taskGroup) => {
  const response = await protectedApi.put(`/task-group/${id}`, taskGroup);
  return response.data;
};

const getTaskGroupsList = async () => {
  const response = await protectedApi.get("/task-group");
  return response.data;
};

const deleteTaskGroup = async (id) => {
  const response = await protectedApi.delete(`/task-group/${id}`);
  return response.data;
};

export {
  createTaskGroup,
  getTaskGroup,
  updateTaskGroup,
  getTaskGroupsList,
  deleteTaskGroup,
};
