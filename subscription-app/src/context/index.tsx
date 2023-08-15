import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  data: {
    id: string;
    email: string;
  } | null;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([
  {
    data: null,
    loading: true,
    error: null,
  },
  () => {},
]);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/auth/me");
      setUser({ data, loading: false, error: null });
    } catch (error) {
      setUser({ data: null, loading: false, error: "Error fetching user" });
    }
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
