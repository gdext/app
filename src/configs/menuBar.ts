import { MenuBarItem } from "@/components/MenuBar/MenuBar";
import { 
    actionsFile, actionsEdit, 
    actionsWindow, actionsHelp 
} from "@/engine/actions/actionTypes";

const menuBar: MenuBarItem[] = [

    { title: 'File', id: 'file', options: [
        { label: 'New', shortcut: 'Ctrl + N', ...actionsFile.new() },
        { divider: true },
        { label: 'Save', shortcut: 'Ctrl + S', ...actionsFile.save() },
        { label: 'Save as new', shortcut: 'Ctrl + Shift + S', ...actionsFile.saveAs() },
        { label: 'Load', shortcut: 'Ctrl + O', ...actionsFile.load() },
        { label: 'Export', suboptions: [
            { label: 'gmd2', shortcut: 'Ctrl + E', ...actionsFile.export('gmd2') },
            { label: 'gmd', ...actionsFile.export('gmd') },
            { label: 'gdx', ...actionsFile.export('gdx') },
        ] },
        { label: 'Import', suboptions: [
            { label: 'gmd2', shortcut: 'Ctrl + I', ...actionsFile.import('gmd2') },
            { label: 'gmd', ...actionsFile.import('gmd') },
            { label: 'gdx', ...actionsFile.import('gdx') },
        ] },
        { divider: true },
        { label: 'Quit', shortcut: 'Ctrl + Q', ...actionsWindow.quit() },
    ] },

    { title: 'Edit', id: 'edit', options: [
        { label: 'Undo', shortcut: 'Ctrl + Z', ...actionsEdit.undo() },
        { label: 'Redo', shortcut: 'Ctrl + Y', ...actionsEdit.redo() },
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
        { label: 'Level', ...actionsHelp.settings(0) },
        { label: 'General', ...actionsHelp.settings(1) },
        { label: 'Editor', ...actionsHelp.settings(2) },
        { label: 'Flags', ...actionsHelp.settings(3) },
        { label: 'Shortcuts', ...actionsHelp.settings(4) },
    ] },

    { title: 'Help', id: 'help', options: [
        { label: 'About', ...actionsHelp.about() },
        { divider: true },
        { label: 'Report a bug', ...actionsHelp.openResource('reportBug') },
        { label: 'GDExt Wiki', ...actionsHelp.openResource('wiki') },
        { label: 'Contribute', ...actionsHelp.openResource('contribute') },
        { divider: true },
        { label: 'GD Docs', ...actionsHelp.openResource('gdDocs') },
        { label: 'Discord Server', ...actionsHelp.openResource('discord') },
    ] },
    
];

export default menuBar;