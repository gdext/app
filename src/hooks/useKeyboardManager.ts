import { useEffect } from "react";

import keyboardManager from "@/engine/keyboard/keyboardManager";

export const useKeyboardManager = () => {
    useEffect(() => {
        keyboardManager.init();
        return () => {
            keyboardManager.destroy();
        };
    }, []);
}