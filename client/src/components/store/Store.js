import React, { createContext } from 'react';

export const initialStoreState = {
    user: undefined,
};


export const StoreContext = createContext(initialStoreState);
export const useStoreContext = () => React.useContext(StoreContext);
