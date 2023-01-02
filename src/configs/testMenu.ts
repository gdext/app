import { MenuList, MenuOption } from "@/components/OptionsMenu/components/Option";

const testMenu: MenuList = [
    { label: 'Test 1', icon: 'newFile', suboptions: [
        { label: 'Test 1.1', shortcut: 'Ctrl + Shift + S' },
        { label: 'Test 1.2' },
        { label: 'Test 1.3' },
        { label: 'Recursion', suboptions: [] },
    ] },
    { label: 'Test 2', icon: 'save', shortcut: 'Ctrl + S' },
    { label: 'Test 3', icon: 'open', shortcut: 'Ctrl + O' },
    { divider: true },
    { label: 'Test 4', suboptions: [
        { label: 'Test 4.1', icon: 'arrowRight', variation: 'danger' },
        { label: 'Test 4.2', icon: 'arrowRight', variation: 'warning' },
        { label: 'Test 4.3', icon: 'arrowRight', variation: 'success' },
        { divider: true },
        { label: 'Test 4.4', disabled: true, shortcut: 'Ctrl + C' },
        { label: 'Test 4.5', disabled: true, shortcut: 'Ctrl + V' }
    ] },
];
((testMenu![0] as MenuOption).suboptions![3] as MenuOption).suboptions! = testMenu;

export default testMenu;