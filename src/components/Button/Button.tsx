import { MouseEvent } from 'react';
import cn from 'classnames';

import icons, { Icon } from '@/utils/icons';
import actionManager from '@/engine/actions/actionManager';

import classes from './Button.module.scss';

type ButtonProps = {
    text: string;
    icon?: string;
    variation?: 'warning' | 'danger' | 'success' | 'secondary' | 'dark';
    size?: 'normal' | 'big';
    fullWidth?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    action?: string;
    payload?: any;
    className?: string;
}

const Button = ({ 
    text, icon, 
    variation, size, fullWidth, disabled, 
    onClick, action, payload, 
    className 
}: ButtonProps) => {

    const defaultOnClick = () => {
        if (action) actionManager.dispatch({ action, payload });
    }

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        (onClick ?? defaultOnClick)();
    }

    return (
        <button 
            className={cn(
                classes.button, className,
                variation && classes[variation],
                size && classes[size],
                {
                    [classes.disabled]: disabled,
                    [classes.fullWidth]: fullWidth,
                }
            )}
            onClick={handleClick}
        >
            {icon && <Icon icon={icons[icon]} />}
            <span>{text}</span>
        </button>
    )
}

export default Button;