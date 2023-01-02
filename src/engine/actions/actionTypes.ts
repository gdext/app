import { Action } from "./actionManager"

type ActionTypeMap = {
    [key: string]: (...args: any[]) => Action;
}

export const actionsFile: ActionTypeMap = {

    new: () => ({
        action: 'new'
    }),

    load: () => ({
        action: 'load'
    }),
    save: () => ({
        action: 'save'
    }),
    saveAs: () => ({
        action: 'saveAs'
    }),
    export: (format: string) => ({
        action: 'export',
        payload: { format }
    }),
    import: (format: string) => ({
        action: 'import',
        payload: { format }
    }),

}

export const actionsWindow: ActionTypeMap = {

    quit: () => ({
        action: 'quit'
    }),

    toggleDevTools: () => ({
        action: 'toggleDevTools'
    }),
    toggleFullscreen: () => ({
        action: 'toggleFullscreen'
    }),

    maximize: () => ({
        action: 'maximize'
    }),
    minimize: () => ({
        action: 'minimize'
    }),

}

export const actionsEdit: ActionTypeMap = {

    undo: () => ({
        action: 'undo'
    }),
    redo: () => ({
        action: 'redo'
    }),

    copy: (content: any) => ({
        action: 'copy',
        payload: { content }
    }),
    cut: (content: any) => ({
        action: 'cut',
        payload: { content }
    }),
    paste: () => ({
        action: 'paste'
    }),

    delete: () => ({
        action: 'delete'
    }),
    deselect: () => ({
        action: 'deselect'
    }),

}

export const actionsHelp: ActionTypeMap = {

    about: () => ({
        action: 'about'
    }),

    settings: (category: number) => ({
        action: 'settings',
        payload: { category }
    }),

    openResource: (resource: string) => ({
        action: 'openResource',
        payload: { resource }
    }),

}