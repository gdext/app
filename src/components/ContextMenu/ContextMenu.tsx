import { useRef } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';

import OptionsMenu from '../OptionsMenu';
import { MenuList } from '../OptionsMenu/components/Option';

import classes from './ContextMenu.module.scss';

type ContextMenuProps = {
    menu: MenuList;
    title?: string;
    x: number;
    y: number;
    onClose?: () => void;
}

const ContextMenu = ({
    menu, title, x, y, onClose
}: ContextMenuProps) => {

    const menuRef = useRef<HTMLDivElement>(null);

    useOutsideClick(() => {
        onClose?.();
    }, menuRef);

    return (
        <div className={classes.menuWrapper} style={{ left: x, top: y }} ref={menuRef}>
            <OptionsMenu 
                options={menu} 
                title={title} 
                translucent 
                onSelect={onClose}
            />
        </div>
    );

}

export default ContextMenu;