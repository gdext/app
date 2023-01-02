import { useState, useEffect, ReactNode } from 'react';
import { useTimeout } from 'ahooks';
import cn from 'classnames';

import classes from './ModalsManager.module.scss';


const CLOSING_DELAY = 300;

type ModalsManagerProps = {
    modals: ReactNode[];
}

const ModalsManager = ({ modals }: ModalsManagerProps) => {

    const [ visible, setVisible ] = useState(!!modals.length);
    const [ closing, setClosing ] = useState(false);

    useEffect(() => {
        if (!visible && modals.length)
            setVisible(true);
        else if (visible && !modals.length)
            setClosing(true);
    }, [modals]);

    useTimeout(() => {
        if (closing) {
            setClosing(false);
            setVisible(false);
        }
    }, closing ? CLOSING_DELAY : undefined);


    return (
        <div className={cn(classes.modalsContainer, {
            [classes.vis]: visible,
            [classes.cls]: closing
        })}>
            {modals.map((modal, index) => (
                <div key={index} className={classes.modal}>
                    {modal}
                </div>
            ))}
        </div>
    );
    
}

export default ModalsManager;