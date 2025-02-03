import { publicApi } from "../publicApi";

const login = async ({ pseudo, password }) => {
  const response = await publicApi.post("/login", {
    pseudo,
    password,
  });
  return response.data;
};
const signUp = async ({ pseudo, password, email }) => {
  const response = await publicApi.post("/inscription", {
    pseudo,
    password,
    email,
  });
  return response;
};

const emailConfirmation = async (token) => {
  const response = await publicApi.get(`/verify-email?token=${token}`);
  return response;
};

export { login, signUp, emailConfirmation };
