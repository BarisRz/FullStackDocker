import { publicApi } from "../publicApi";
import { protectedApi } from "../protectedApi";

// Public

const logout = async () => {
  const response = await publicApi.get("/logout");
  return response;
};

const handleRefreshToken = async () => {
  const response = await publicApi.get("/refresh");
  return response;
};

// Protected

const deleteUser = async () => {
  const response = await protectedApi.delete("/user");
  return response;
};

const protectedRoute = async (accessToken) => {
  const response = await protectedApi.get("/protected-route", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export { logout, handleRefreshToken, deleteUser, protectedRoute };
