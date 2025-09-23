import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [isLoggedIn, setLoggedIn ] = useState(false); 
    const  [avatarURL,setAvatarUrl] = useState('');
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        setLoggedIn(true);
        }
    }, []);

     // Hàm login
  const login = (avatar) => {
    setLoggedIn(true);
    setAvatarUrl(avatar);
  };

  console.log("AuthProvider render, avatarURL:", avatarURL);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, avatarURL}}>
      {children}
    </AuthContext.Provider>
  );
}
