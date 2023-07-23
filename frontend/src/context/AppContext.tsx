import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import Cookie from "js-cookie";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/client";

// Define the type for the user object
interface User {
  email: string;
  username: string;
  // Add other user-related properties here
}

// Define the context type
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the AppContext with the correct type
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const getUser = async () => {
  const token = Cookie.get("token");
  if (!token) return null;
  const client = getClient(); // You need to define this function
  const { data } = await client.query({
    query: gql`
      query {
        me {
          id
          email
          username
        }
      }
    `,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  return data.me as User; // Cast the response to the User type
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
