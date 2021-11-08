import React, { createContext } from 'react';

export const initialStoreState = {
    user: null,
};


export const StoreContext = createContext(initialStoreState);
export const useStoreContext = () => React.useContext(StoreContext);
