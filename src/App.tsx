import { useState, useRef } from 'react';
import { useSize } from 'ahooks';
import { GDRWebCanvas } from 'gdrweb-react';

import OptionsMenu from './components/OptionsMenu';
import { MenuList, MenuOption } from './components/OptionsMenu/components/Option';

import './App.scss';

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
        { label: 'Test 4.1', icon: 'arrowRight' },
        { label: 'Test 4.2', icon: 'arrowRight' },
        { label: 'Test 4.3', icon: 'arrowRight' },
    ] },
];
((testMenu![0] as MenuOption).suboptions![3] as MenuOption).suboptions! = testMenu;

const App = () => {

    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const size = useSize(canvasWrapperRef);

    const [ levelString, setLevelString ] = useState('');

    return (
        <div id="app">
            <div className='canvasWrapper' ref={canvasWrapperRef}>
                <GDRWebCanvas
                    levelString={levelString}
                    width={size?.width ?? 800}
                    height={size?.height ?? 600}
                    config={{
                        pan: {
                            mouseButtons: 'middle'
                        }
                    }}
                />
            </div>
            <div style={{ position: 'absolute', top: 200, left: 200, zIndex: 1000 }}>
                <OptionsMenu
                    title="Test"
                    options={testMenu}
                    translucent
                />
            </div>
            <div>
                <h2>Upload the Level file:</h2>
                <input type="file" onChange={(e) => {
                    const file = e.target.files?.item(0);
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = e => {
                            if (e.target?.result)
                                setLevelString(e.target.result.toString());
                        };
                        reader.readAsText(file);
                    }
                }} />
            </div>
        </div>
    );
};

export default App;