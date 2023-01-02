import { ReactNode, createContext } from 'react';

export const ModalContext = createContext({
    addModal: (_modal: ReactNode) => {},
    removeModal: (_modal: ReactNode) => {},
    removeLastModal: (_depth: number = 1) => {},
    clearModals: () => {}
});