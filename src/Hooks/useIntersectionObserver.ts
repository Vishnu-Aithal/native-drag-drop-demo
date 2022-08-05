import { RefObject, useEffect, useRef } from "react";

export const useInterSectionObserver = <
    T extends RefObject<HTMLElement>,
    U extends RefObject<HTMLElement>
>(
    root: T,
    target: U,
    callback: IntersectionObserverCallback
) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    if (!observerRef.current) {
        let options = {
            root: root.current,
            rootMargin: "0px",
            threshold: 1.0,
        };

        observerRef.current = new IntersectionObserver(callback, options);
    }
    useEffect(() => {
        if (target.current) {
            observerRef.current?.observe(target.current);
        }

        return () => observerRef.current?.disconnect();
    }, [root, target, callback]);
};
