import { useState } from "react";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  async function login(identifier: string, password: string, method: "email" | "phone") {
    try {
      setLoading(true);
      setError("");

      const res = await AuthService.login({ identifier, method, password });
      return res;

    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
      return false;

    } finally {
      setLoading(false);
    }
  }

  function logout() {
    // Remove token
    document.cookie = "access_token=; Max-Age=0; path=/;";

    // Redirect to login page
    router.push("/login");
  }

  return { login, logout, loading, error };
}
