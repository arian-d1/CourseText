import { createContext, useState, useEffect } from "react";
import { checkAuth } from "../api/setAuth";

const AuthContext = createContext({});

// children is everything that provider wraps
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  

  // loads the authentication state stored in the browser
  useEffect(() => {
    const loadAuth = async () => {
      const res = await checkAuth();
      setAuth(res);
    };

    loadAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
