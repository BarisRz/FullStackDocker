import { protectedApi } from "../protectedApi";

const getAllTasksFromGroup = async (groupId) => {
  const response = await protectedApi.get(`/task-all/${groupId}`);
  return response.data;
};

const updateTask = async (taskId, task) => {
  const response = await protectedApi.put(`/task/${taskId}`, task);
  return response.data;
};

export { getAllTasksFromGroup, updateTask };
