import { useState, useRef } from 'react';
import { useSize } from 'ahooks';
import { GDRWebCanvas } from 'gdrweb-react';

import menuBar from '@/configs/menuBar';
import testMenu from '@/configs/testMenu';

import { useAction } from '@/hooks/useAction';
import { useKeyboardManager } from '@/hooks/useKeyboardManager';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useModals } from '@/hooks/useModals';
import { useContextMenu } from '@/hooks/useContextMenu';

import { ModalContext } from '@/context/ModalContext';

import MenuBar from '@/components/MenuBar';
import ModalsManager from '@/components/ModalsManager';
import TestControls from '@/components/AppElements/TestControls';

import './App.scss';

const App = () => {

    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<HTMLDivElement>(null);
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

    // test menu
    const contextMenu = useContextMenu(appRef, testMenu);

    return (
        <ModalContext.Provider value={{ 
            addModal, removeModal, 
            removeLastModal, clearModals 
        }}>
            <div id="app" ref={appRef}>

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

                { contextMenu }

                <TestControls
                    keys={keys}
                    onLevelFileLoad={setLevelString}
                />

            </div>
        </ModalContext.Provider>
    );
};

export default App;