import { publicApi } from "../publicApi";

const logout = async () => {
  const response = await publicApi.get("/logout");
  return response;
};

const handleRefreshToken = async () => {
  const response = await publicApi.get("/refresh");
  return response;
};

export { logout, handleRefreshToken };
