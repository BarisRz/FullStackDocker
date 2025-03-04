import { protectedApi } from "../protectedApi";

const getAllTasksFromGroup = async (groupId) => {
  const response = await protectedApi.get(`/task-all/${groupId}`);
  return response.data;
};

const updateTask = async (taskId, task) => {
  const response = await protectedApi.put(`/task/${taskId}`, task);
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await protectedApi.delete(`/task/${taskId}`);
  return response.data;
};

const addTask = async (task) => {
  const response = await protectedApi.post("/task", task);
  return response.data;
};

export { getAllTasksFromGroup, updateTask, deleteTask, addTask };
