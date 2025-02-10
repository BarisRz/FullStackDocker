import { publicApi } from "../publicApi";

const logout = async () => {
  const response = await publicApi.get("/logout");
  return response;
};

export { logout };
