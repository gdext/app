import { useState, useRef } from 'react';
import { useSize } from 'ahooks';
import { GDRWebCanvas } from 'gdrweb-react';

import './App.scss';

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