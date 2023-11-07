import React, { createContext } from "react";

export const initialStoreState = {
  user: undefined,
  isLoggedIn: false,
};

export const StoreContext = createContext(initialStoreState);
export const useStoreContext = () => React.useContext(StoreContext);
