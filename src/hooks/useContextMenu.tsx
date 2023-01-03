import { useState, useEffect, RefObject } from 'react';

import ContextMenu from '@/components/ContextMenu';
import { MenuList } from '@/components/OptionsMenu/components/Option';

export const useContextMenu = (target: RefObject<HTMLElement>, menu: MenuList) => {

    const [ menuActive, setMenuActive ] = useState(false);
    const [ menuPosition, setMenuPosition ] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const contextMenuListener = (e: MouseEvent) => {
            e.preventDefault();
            setMenuActive(true);
            setMenuPosition({ x: e.pageX, y: e.pageY });
        };

        target.current?.addEventListener('contextmenu', contextMenuListener);

        return () => {
            target.current?.removeEventListener('contextmenu', contextMenuListener);
        }
    }, [target]);

    return menuActive ? <ContextMenu 
        menu={menu} 
        x={menuPosition.x} y={menuPosition.y} 
        onClose={() => setMenuActive(false)} 
    /> : null;

}