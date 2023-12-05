import React, { createContext } from "react";
import { LOGGED_OUT_PAGES } from "../Utils/constants";

export const initialStoreState = {
  user: undefined,
  isLoggedIn: false,
  currentPage: LOGGED_OUT_PAGES.LOGIN,
};

export const StoreContext = createContext(initialStoreState);
export const useStoreContext = () => React.useContext(StoreContext);
