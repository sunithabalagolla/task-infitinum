import React, { createContext, useState } from "react";

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [images,setImages] = useState([])
  return (
    <div>
      <UserContext.Provider value={{user,setUser,images,setImages}}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default AuthProvider;
