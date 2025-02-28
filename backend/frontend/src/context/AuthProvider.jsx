import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const initialState = Cookies.get("accessToken") || localStorage.getItem("chatApp");
  // console.log(initialState);

  const [authUser, setAuthUser] = useState(
    initialState ? JSON.parse(initialState) : undefined
  );
  console.log(authUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
