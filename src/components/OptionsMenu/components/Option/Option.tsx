import { useState, useRef, MouseEvent } from 'react';
import { useTimeout } from 'ahooks';
import cn from 'classnames';

import icons, { Icon } from '@/utils/icons';
import actionManager from '@/engine/actions/actionManager';

import classes from '../../OptionsMenu.module.scss';


const SUBMENU_TRIGGER_DELAY = 500;

export type MenuOption = {
    label: string;
    icon?: string;
    shortcut?: string;
    variation?: 'warning' | 'danger' | 'success';
    disabled?: boolean;
    action?: string;
    payload?: any;
    onClick?: () => void;
    suboptions?: MenuList;
}

export type MenuDivider = {
    divider: true;
}

export type MenuList = (MenuOption|MenuDivider)[];

type OptionProps = MenuOption & {
    onSubmenuOpen?: (isSubmenu: boolean, offsetY: number) => void;
    onSubmenuClose?: () => void;
    parentActive?: boolean;
    active?: boolean;
}

const Option = ({ 
    label, icon, shortcut, 
    variation, disabled,
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
        if (action) actionManager.dispatch({ action, payload });
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
        if (disabled) return;

        if (isSubmenu) {
            if (active) triggerSubmenuClose();
            else triggerSubmenuOpen();
        } else {
            (onClick ?? defaultOnClick)();
        }
    }

    return (
        <div 
            className={cn(classes.option, variation && classes[variation], {
                [classes.active]: active,
                [classes.disabled]: disabled,
            })}
            ref={ref}
            onClick={handleClick}
            onMouseEnter={delaySubmenuOpen}
            onMouseLeave={() => setSubmenuOpen(false)}
        >
            <div className={classes.optionLeft}>
                {icon && <Icon icon={icons[icon]} />}
                <span>{label}</span>
            </div>
            <div className={classes.optionRight}>
                { shortcut && <div className={classes.shortcut}>{shortcut}</div> }
                { suboptions && <Icon icon={icons.arrowRight} /> }
            </div>
        </div>
    );

}

export default Option;