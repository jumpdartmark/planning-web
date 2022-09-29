import { useState, useEffect } from "react";

const useAuth = (context?: string) => {
    const [localContext, setLocalContext] = useState<string | undefined>(context);

    const getLocalValue = (valueKey:string) => {
        return localStorage.getItem(`${localContext}${valueKey}`);
    };

    const setLocalValue = (valueKey: string, valueJSONString: string) => {
        return localStorage.setItem(`${localContext}${valueKey}`, valueJSONString);
    };

    useEffect(() => {
        setLocalContext(context)
    }, [context]);

    return {
        getLocalValue,
        setLocalValue,
    };
};

export default useAuth;