export type Action = {
    action: string;
    payload?: any;
}

class ActionManager {
    
    subscribers: Set<Function> = new Set();

    dispatch (action: Action) {
        console.log('action triggered:', action);
        this.subscribers.forEach(subscriber => subscriber(action));
    }

    subscribe (subscriber: Function) {
        this.subscribers.add(subscriber);
    }

    unsubscribe (subscriber: Function) {
        this.subscribers.delete(subscriber);
    }

}

const actionManager = new ActionManager();
export default actionManager;