import { useEffect } from "react";

export const useDebounce = (
    state: any,
    callback: (...args: any) => void,
    delay: number
) => {
    useEffect(() => {
        const timerId = setTimeout(() => callback(), delay);
        return () => clearTimeout(timerId);
    }, [state, delay, callback]);
};
