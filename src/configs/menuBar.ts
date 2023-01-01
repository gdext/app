import { MenuBarItem } from "@/components/MenuBar/MenuBar";

const menuBar: MenuBarItem[] = [

    { title: 'File', id: 'file', options: [
        { label: 'New', shortcut: 'Ctrl + N', action: 'new' },
        { divider: true },
        { label: 'Save', shortcut: 'Ctrl + S', action: 'save' },
        { label: 'Save as new', shortcut: 'Ctrl + Shift + S', action: 'saveAs' },
        { label: 'Load', shortcut: 'Ctrl + O', action: 'load' },
        { label: 'Export', shortcut: 'Ctrl + E', action: 'export' },
        { label: 'Import', shortcut: 'Ctrl + I', action: 'import' },
        { divider: true },
        { label: 'Quit', shortcut: 'Ctrl + Q', action: 'quit' },
    ] },

    { title: 'Edit', id: 'edit', options: [
        { label: 'Undo', shortcut: 'Ctrl + Z', action: 'undo' },
        { label: 'Redo', shortcut: 'Ctrl + Y', action: 'redo' },
        { divider: true },
        { label: 'Rename Level', shortcut: 'F2', action: 'renameLevel' },
        { label: 'Level Settings', action: 'levelSettings' },
    ] },

    { title: 'Build', id: 'build', options: [
        { label: 'Build Helper', action: 'buildHelper' },
        { label: 'Align Horizontally', action: 'alignHorizontally' },
        { label: 'Align Vertically', action: 'alignVertically' },
        { divider: true },
        { label: 'Create Block Base', action: 'createBlockBase' },
        { label: 'Create Block Outlines', action: 'createBlockOutlines' },
        { label: 'Create Block Edges', action: 'createBlockEdges' },
        { divider: true },
        { label: 'Reset unused colors and groups', action: 'resetUnused' },
        { label: 'Uncheck portals', action: 'uncheckPortals' },
    ] },

    { title: 'Settings', id: 'settings', options: [
        { label: 'Level', action: 'settings1' },
        { label: 'General', action: 'settings2' },
        { label: 'Editor', action: 'settings3' },
        { label: 'Flags', action: 'settings4' },
        { label: 'Shortcuts', action: 'settings5' },
    ] },

    { title: 'Help', id: 'help', options: [
        { label: 'About', action: 'about' },
        { divider: true },
        { label: 'Report a bug', action: 'reportBug' },
        { label: 'GDExt Wiki', action: 'wiki' },
        { label: 'Contribute', action: 'contribute' },
        { divider: true },
        { label: 'GD Docs', action: 'gdDocs' },
        { label: 'Discord Server', action: 'discord' },
    ] },
    
];

export default menuBar;