import { protectedApi } from "../protectedApi";

const getAllTasksFromGroup = async (groupId) => {
  const response = await protectedApi.get(`/task-all/${groupId}`);
  return response.data;
};

export { getAllTasksFromGroup };
