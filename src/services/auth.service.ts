import { api } from "@/utils/axiosInstance";
import { LoginPayload, SignupPayload } from "@/types/auth.types";

export const AuthService = {
  async login(data: LoginPayload) {
    const res = await api.post("/auth/login", data);
    return res.data;
  }
  ,

  async signup(data: SignupPayload) {
    const res = await api.post("/auth/signup", data);
    return res.data;
  },
};
