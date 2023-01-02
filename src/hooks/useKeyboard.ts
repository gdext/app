import { useState, useEffect } from "react";

import keyboardManager from "@/engine/keyboard/keyboardManager";

export const useKeyboard = () => {
    const [keys, setKeys] = useState<string[]>([]);

    useEffect(() => {
        const changeListener = () => {
            setKeys(keyboardManager.format());
        };
        
        keyboardManager.on('change', changeListener);
        return () => {
            keyboardManager.off('change', changeListener);
        }
    }, []);

    return keys;
}