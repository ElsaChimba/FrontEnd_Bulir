
import { api } from "./api";

export async function login(emailOrNif: string, password: string) {
  const response = await api.post("/auth/login", {
    emailOrNif,
    password,
  });

  return response.data; 
}
