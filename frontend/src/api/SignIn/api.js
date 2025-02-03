import { publicApi } from "../publicApi";

const login = async ({ pseudo, password }) => {
  const response = await publicApi.post("/login", {
    pseudo,
    password,
  });
  return response.data;
};

export { login };
