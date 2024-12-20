import React, { useState, useContext } from "react";

const CredentialsContext = React.createContext([{}, () => {}]);


let initialState = null
const CredentialsProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <CredentialsContext.Provider value={[state, setState]}>
      {props.children}
    </CredentialsContext.Provider>
  );
};

const useCredentials = () => {
  return useContext(CredentialsContext);
};

export { CredentialsContext, CredentialsProvider, useCredentials };
