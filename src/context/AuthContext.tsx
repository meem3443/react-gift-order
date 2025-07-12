import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: { email: string } | null;
  login: (email: string, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 반드시 AuthProvider 내에서 사용되어야 합니다.");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("user");

    if (storedLoggedIn === "true" && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        console.error(
          "로컬 스토리지에서 사용자 데이터를 파싱하는데 실패했습니다.",
          error
        );

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, token?: string) => {
    setIsLoggedIn(true);
    const userData = { email: email };
    setUser(userData);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("authToken", token);
    }
    navigate("/my");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const contextValue = {
    isLoggedIn,
    isLoading,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
