import React from 'react';
import { useLocation } from 'react-router-dom';

function paramsToObject(entries) {
    const result = {}
    for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value;
    }
    return result;
}

export function useQuery() {
    const entries = (new URLSearchParams(useLocation().search)).entries();
    return paramsToObject(entries);
}

export const useLocationChange = (action) => {
    const location = useLocation()
    React.useEffect(() => { action(location) }, [location])
}