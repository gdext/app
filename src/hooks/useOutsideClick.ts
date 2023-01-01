import { useEffect, RefObject } from "react";

export const useOutsideClick = (func: () => void, ref: RefObject<any>) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target))
                func();
        }
        
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}