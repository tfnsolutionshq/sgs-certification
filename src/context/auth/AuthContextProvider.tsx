import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { AuthContextType } from "./types";
// import usersData from "../../data/users.json";
import api from "../../utils/api";

type AuthContextProviderProps = {
  children: ReactNode;
};

type Role = "super admin" | "admin" | "read-only admin";

type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

type LoginData = {
  token: string;
  user: {
    email: string;
    name: string;
  };
};

const AuthContext = createContext<AuthContextType | null>(null);

const normalizeRole = (name: string): Role => {
  switch (name) {
    case "Super Admin":
      return "super admin";
    case "Admin":
      return "admin";
    case "Read-only Admin":
      return "read-only admin";
    default:
      throw new Error("Unknown role from backend");
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<{
    email: string;
    role: Role;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("sgs_token");
    const storedUser = localStorage.getItem("sgs_user");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({
        email: "",
        role: "read-only admin", // or a safe default fallback
      });
    }

    setLoading(false);
  }, []);

  const isValidRole = (role: string): role is Role => {
    return (
      role === "Super Admin" || role === "Admin" || role === "Read-only Admin"
    );
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<ApiResponse<LoginData>>("/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      if (!isValidRole(user.name)) {
        throw new Error("Invalid Role!");
      }

      // 🔁 Mapping layer (VERY IMPORTANT)
      const appUser = {
        email: user.email,
        role: normalizeRole(user.name),
      };

      setUser(appUser);

      localStorage.setItem("sgs_user", JSON.stringify(appUser));
      localStorage.setItem("sgs_token", token);

      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("401")) {
          return { success: false, message: "Invalid Credentials!" };
        }
        if (error.message.includes("429")) {
          return {
            success: false,
            message: "Too many attempts! Try again later.",
          };
        }
      }

      return { success: false, message: "An unexpected error occurred." };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("sgs_user");
    localStorage.removeItem("sgs_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
