import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { AuthContextType } from "./types";
import usersData from "../../data/users.json";

type AuthContextProviderProps = {
  children: ReactNode;
};

type Role = "super admin" | "admin" | "read-only admin";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<{
    emailAddress: string;
    role: Role;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const isValidRole = (role: string): role is Role => {
    return (
      role === "super admin" || role === "admin" || role === "read-only admin"
    );
  };

  const login = (emailAddress: string, password: string) => {
    const matchedUser = usersData.find(
      (user) => user.emailAddress === emailAddress,
    );

    if (matchedUser) {
      if (matchedUser.password !== password) {
        return { success: false, message: "Wrong Password!" };
      }

      if (!isValidRole(matchedUser.role)) {
        throw new Error("Invalid Role!");
      }

      setUser({
        emailAddress: matchedUser.emailAddress,
        role: matchedUser.role,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          emailAddress: matchedUser.emailAddress,
          role: matchedUser.role,
        }),
      );

      return { success: true };
    } else {
      return { success: false, message: "User not found!" };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
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
