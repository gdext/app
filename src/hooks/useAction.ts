import { useEffect } from "react";

import actionManager, { Action } from "@/engine/actions/actionManager";

export const useAction = (actionName: string, func: (action: Action) => void) => {
    useEffect(() => {
        const subscriber = (action: Action) => {
            if (action.action === actionName)
                func(action);
        }
        
        actionManager.subscribe(subscriber);
        return () => {
            actionManager.unsubscribe(subscriber);
        };
    }, [actionName]);
}