import { protectedApi } from "../protectedApi";

const getAllTasksFromGroup = async (groupId) => {
  const response = await protectedApi.get(`/task-all/${groupId}`);
};

export { getAllTasksFromGroup };
