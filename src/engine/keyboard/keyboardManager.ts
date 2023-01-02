import keycodes from '@/assets/dicts/keycodes.json';
import shortcuts from '@/assets/dicts/shortcuts.json';

import actionManager from '../actions/actionManager';

type Subscriber = (keys?: string[]) => void;

class KeyboardManager {

    private keys: Set<number> = new Set();
    private subscribers: any = {
        change: new Set<Subscriber>(),
        down: new Set<Subscriber>(),
        up: new Set<Subscriber>(),
    }

    init () {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
        window.addEventListener('blur', this.clearAllKeys);
    }

    destroy () {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
        window.removeEventListener('blur', this.clearAllKeys);
    }

    on (event: string, subscriber: Subscriber) {
        this.subscribers[event].add(subscriber);
    }

    off (event: string, subscriber: Subscriber) {
        this.subscribers[event].delete(subscriber);
    }

    doesMatch (keys: string[]) {
        const formatted = this.format();
        return formatted.length === keys.length && formatted.every((key, index) => key === keys[index]);
    }

    private dispatch (event: string) {
        const formatted = this.format();
        this.subscribers[event].forEach((subscriber: Subscriber) => subscriber(formatted));
    }

    private onKeyDown = (event: KeyboardEvent) => {
        this.keys.add(event.keyCode);
        this.dispatch('down');
        this.dispatch('change');

        shortcuts.forEach(({ keys, action, payload }) => {
            if (this.doesMatch(keys)) {
                event.preventDefault();
                actionManager.dispatch({ action, payload });
            }
        });
    }

    private onKeyUp = (event: KeyboardEvent) => {
        this.keys.delete(event.keyCode);
        this.dispatch('up');
        this.dispatch('change');
    }

    private clearAllKeys = () => {
        this.keys.clear();
        this.dispatch('change');
    }

    format () {
        const array = [...this.keys]
            .sort((a, b) => a - b)
            .map(key => (keycodes as any)[key])
            .filter(key => key);

        return array;
    }
    
}

const keyboardManager = new KeyboardManager();
export default keyboardManager;