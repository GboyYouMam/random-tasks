'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import {fetchIPData} from "./IPGetterApi.js";

//create context
const IPGetterContext = createContext(null);

//create provider
export const IPGetterProvider = ({ children }) => {
    //data setup
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //func to lookup IP`s
    const lookupIP = useCallback( async (ip) => {
        setLoading(true);
        setError(null);
        try {
            //trim and validate IP
            const trimmedIP = (ip || '').trim();
            if (!trimmedIP) throw new Error('IP is required');
            //fetching data from server-side function
            const data = await fetchIPData(trimmedIP);
            setIpData(data);
            return data;
        }
            //catching and setting error
        catch (err) {
            const errorMessage = err?.code === 'RATE_LIMIT'
                ? 'Rate limit exceeded! Please wait a moment before trying again.'
                : (err?.message || 'Unknown error');
            setError(errorMessage);
            throw err;
        }
            //finalizing loading state
        finally {
            setLoading(false);
        }
    }, []);

    //sumarizing context value to provide
    const value = { ipData, loading, error, lookupIP };

    return (
        <IPGetterContext.Provider value={value}>
            {children}
        </IPGetterContext.Provider>
    );
}

//custom hook to use the context
export function useIPGetter() {
    const ctx = useContext(IPGetterContext);
    if (!ctx){
        throw new Error('useIPGetter must be used within IPGetterProvider');
    }
    return ctx;
}