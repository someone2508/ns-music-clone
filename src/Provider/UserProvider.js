import { useContext, useState } from "react";
import { createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // huwhuduwduwd723t2326t2eg2eg2ge22eg27
  const [loggedInUser, setLoggedInUser] = useState(null);

  const signIn = (authToken) => {
    setUser(authToken);
  };

  const signUp = (authToken) => {
    setUser(authToken);
  };

  const logout = () => {
    setUser(null);
  };

  const loggedInUserHandler = (user) => {
    setLoggedInUser(user);
  };

  const isUserLoggedIn = user;

  const obj = {
    isUserLoggedIn,
    loggedInUser,
    loggedInUserHandler,
    signIn,
    signUp,
    logout,
  };

  return <UserContext.Provider value={obj}>{children}</UserContext.Provider>;
};

export function useUser() {
  return useContext(UserContext);
}
