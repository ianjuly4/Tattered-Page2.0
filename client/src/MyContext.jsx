import React, {createContext} from "react";

const MyContext = createContext();

const MyContextProvider = ({children})=>{


return (
    <MyContext.Provider
      value={{
        
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
