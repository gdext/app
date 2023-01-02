import { useState, useRef } from 'react';
import cn from 'classnames';

import { useOutsideClick } from '@/hooks/useOutsideClick';

import { MenuList } from '../OptionsMenu/components/Option';
import OptionsMenu from '../OptionsMenu';

import classes from './MenuBar.module.scss';


const MENU_X_SHIFT = 8;

export type MenuBarItem = {
    title: string;
    id: string;
    options: MenuList;
}

type MenuBarProps = {
    items: MenuBarItem[];
}

const MenuBar = ({
    items
}: MenuBarProps) => {

    const [ activeItem, setActiveItem ] = useState(-1);
    const [ menuX, setMenuX ] = useState(0);
    const barRef = useRef<HTMLDivElement>(null);

    const isActive = () => activeItem > -1;
    const close = () => setActiveItem(-1);

    useOutsideClick(close, barRef);

    const calcOffsetX = (elem: EventTarget) => (elem as HTMLElement).offsetLeft ?? 0;

    const selectItem = (index: number, elem: EventTarget) => {
        setActiveItem(index);
        setMenuX(calcOffsetX(elem));
    }

    return (
        <div className={cn(classes.bar, {
            [classes.active]: isActive()
        })} ref={barRef}>
            <div className={classes.barLeft}>
                {items.map((item, index) => (
                    <div key={item.id} 
                        className={cn(classes.barItem, {
                            [classes.active]: activeItem === index
                        })}
                        onClick={e => selectItem(index, e.target)}
                        onMouseEnter={e => {
                            if (isActive()) selectItem(index, e.target);
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <div className={classes.barRight}>
                <span>GDExt v0.0.1</span>
            </div>
            {isActive() && (
                <div className={classes.menuWrapper} style={{ left: menuX - MENU_X_SHIFT }}>
                    <OptionsMenu
                        options={items[activeItem].options}
                        translucent
                        key={activeItem}
                        onSelect={close}
                    />
                </div>
            )}
        </div>
    );

}

export default MenuBar;