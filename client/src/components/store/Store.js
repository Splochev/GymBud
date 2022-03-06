import React, { createContext } from 'react';

export const initialStoreState = {
    user: undefined,
    hasOverflow: true
};


export const StoreContext = createContext(initialStoreState);
export const useStoreContext = () => React.useContext(StoreContext);
