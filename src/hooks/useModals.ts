import { useState, ReactNode } from "react";

export const useModals = () => {

    const [ modals, setModals ] = useState<ReactNode[]>([]);

    const addModal = (modal: ReactNode) => {
        setModals([...modals, modal]);
    }

    const removeModal = (modal: ReactNode) => {
        setModals(modals.filter(m => m !== modal));
    }

    const removeLastModal = (depth: number = 1) => {
        setModals(modals.slice(0, modals.length - depth));
    }

    const clearModals = () => {
        setModals([]);
    }

    return {
        modals,
        addModal, removeModal,
        removeLastModal, clearModals
    };

}