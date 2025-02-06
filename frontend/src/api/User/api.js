import { publicApi } from "../publicApi";

const logout = async (token) => {
  const response = await publicApi.get("/logout");
  return response;
};

export { logout };
