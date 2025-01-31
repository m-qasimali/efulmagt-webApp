import { createContext, useContext, useState } from "react";

const FetchDataContext = createContext();

export const FetchDataProvider = (props) => {
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <FetchDataContext.Provider value={{fetchAgain, setFetchAgain}}>
          {props.children}
        </FetchDataContext.Provider>
      );
}

const useFetchData = () => {
  return useContext(FetchDataContext);
};

export { FetchDataContext, useFetchData };