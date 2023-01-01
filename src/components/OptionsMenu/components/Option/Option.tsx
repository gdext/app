import { useState, useRef, MouseEvent } from 'react';
import { useTimeout } from 'ahooks';

import icons, { Icon } from '@/utils/icons';

import classes from '../../OptionsMenu.module.scss';


const SUBMENU_TRIGGER_DELAY = 500;

export type MenuOption = {
    label: string;
    icon?: string;
    action?: string;
    payload?: any;
    onClick?: () => void;
    suboptions?: MenuOption[];
}

type OptionProps = MenuOption & {
    onSubmenuOpen?: (isSubmenu: boolean, offsetY: number) => void;
    onSubmenuClose?: () => void;
    parentActive?: boolean;
    active?: boolean;
}

const Option = ({ 
    label, icon, 
    action, payload, onClick, 
    onSubmenuOpen, onSubmenuClose,
    suboptions, parentActive, active
}: OptionProps) => {

    // for handling timeout open
    const [ submenuOpen, setSubmenuOpen ] = useState(false);

    // refs
    const ref = useRef<HTMLDivElement>(null);
    

    // helpers and timeout

    const isSubmenu: boolean = !!suboptions;

    const calcTimeoutDelay = () => {
        if (!submenuOpen) return undefined;
        return parentActive ? 0 : SUBMENU_TRIGGER_DELAY;
    }

    const calcOffsetY = () => ref.current?.offsetTop ?? 0;

    useTimeout(() => {
        if (submenuOpen) {
            onSubmenuOpen?.(isSubmenu, calcOffsetY());
            setSubmenuOpen(false);
        }
    }, calcTimeoutDelay());
     
    
    // handlers

    const defaultOnClick = () => {
        console.log(action, payload);
        alert(`Action: ${action} triggered`);
    }

    const delaySubmenuOpen = () => {
        setSubmenuOpen(true);
    }

    const triggerSubmenuOpen = () => {
        onSubmenuOpen?.(isSubmenu, calcOffsetY());
    }

    const triggerSubmenuClose = () => {
        onSubmenuClose?.();
    }

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();

        if (isSubmenu) {
            if (active) triggerSubmenuClose();
            else triggerSubmenuOpen();
        } else {
            (onClick ?? defaultOnClick)();
        }
    }

    return (
        <div 
            className={classes.option}
            ref={ref}
            onClick={handleClick}
            onMouseEnter={delaySubmenuOpen}
        >
            <div className={classes.optionLeft}>
                {icon && <Icon icon={icons[icon]} />}
                <span>{label}</span>
            </div>
            {suboptions && <Icon icon={icons.arrowRight} />}
        </div>
    );

}

export default Option;