import { RefObject, useEffect } from "react";

export const useFocusOnMount = (ref: RefObject<HTMLInputElement>) => {
    useEffect(() => {
        ref.current?.focus();
    }, [ref]);
};
