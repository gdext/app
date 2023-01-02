import { useState, useRef, useContext } from 'react';
import { useSize } from 'ahooks';
import { GDRWebCanvas } from 'gdrweb-react';

import menuBar from '@/configs/menuBar';

import { useAction } from '@/hooks/useAction';
import { useKeyboardManager } from '@/hooks/useKeyboardManager';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useModals } from '@/hooks/useModals';

import { ModalContext } from '@/context/ModalContext';

import MenuBar from '@/components/MenuBar';
import ModalsManager from '@/components/ModalsManager';

import './App.scss';

const App = () => {

    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const size = useSize(canvasWrapperRef);
    const [ levelString, setLevelString ] = useState('');

    useKeyboardManager();
    const {
        modals, 
        addModal, removeModal, 
        removeLastModal, clearModals
    } = useModals();

    const keys = useKeyboard();


    // test action
    useAction('export', ({ action, payload }) => {
        alert(`Action: ${action}, Payload: ${JSON.stringify(payload)}`);
    });

    return (
        <ModalContext.Provider value={{ 
            addModal, removeModal, 
            removeLastModal, clearModals 
        }}>
            <div id="app">

                <ModalsManager modals={modals} />

                <MenuBar items={menuBar} />

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
                    <p>
                        Pressed keys: {keys.join(' + ')}
                    </p>
                </div>

            </div>
        </ModalContext.Provider>
    );
};

export default App;