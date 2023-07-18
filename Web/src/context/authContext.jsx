import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { apiDomain } from "../Utils/Utils";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const response = await axios.post(`${apiDomain}/auth/login`, inputs, {
        withCredentials: true
      });

      const { data } = response;
      setCurrentUser(data);
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
    //   console.error(errorMessage);
      // Handle error state or display error message to the user
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    login();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
