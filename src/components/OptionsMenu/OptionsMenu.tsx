import { useState, useLayoutEffect, useRef } from 'react';
import cn from 'classnames';

import Option, { MenuOption, MenuDivider, MenuList } from './components/Option';

import classes from './OptionsMenu.module.scss';


const SUBMENU_Y_SHIFT = 8;
const MENU_PADDING = 16;

type OptionsMenuProps = {
    title?: string;
    options: MenuList;
    translucent?: boolean;
    onSelect?: (option: MenuOption, index: number) => void;
}

const OptionsMenu = ({
    title, options, translucent, onSelect
}: OptionsMenuProps) => {

    const [ openSubmenu, setOpenSubmenu ] = useState(-1);
    const [ submenuY, setSubmenuY ] = useState(0);

    const submenuActive = openSubmenu > -1;


    const [ menuPosShift, setMenuPosShift ] = useState([0, 0]);
    const [ menuXFlip, setMenuXFlip ] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const calcMenuPosShift = () => {
        if (!menuRef.current) return [0, 0];

        const menuRect = menuRef.current.getBoundingClientRect();
        const menuBottom = menuRect.top + menuRect.height;
        const menuRight = menuRect.left + menuRect.width;
        const windowBottom = window.innerHeight - MENU_PADDING;
        const windowRight = window.innerWidth - MENU_PADDING;

        return [
            Math.max(0, menuRight - windowRight),
            Math.max(0, menuBottom - windowBottom),
        ];
    }

    const calcMenuXFlip = () => {
        if (!menuRef.current) return false;

        const menuRect = menuRef.current.getBoundingClientRect();
        const menuRight = menuRect.left + menuRect.width;
        const windowRight = window.innerWidth - MENU_PADDING - menuRect.width;

        return menuRight > windowRight;
    }

    useLayoutEffect(() => {
        setMenuPosShift(calcMenuPosShift());
        setMenuXFlip(calcMenuXFlip());
    }, []);

    return (
        <div ref={menuRef} className={cn(classes.container, {
            [classes.translucent]: translucent,
            [classes.xFlip]: menuXFlip,
        })} style={{
            transform: `translate(-${menuPosShift[0]}px, -${menuPosShift[1]}px)`
        }}>

            {/** Menu Title */}
            {title && <h4>{title}</h4>}

            {/** Menu Options */}
            <div className={classes.options}>
                {options.map((option, index) => {

                    const optionDivider = option as MenuDivider;
                    const optionNormal  = option as MenuOption;

                    if (optionDivider.divider)
                        return <div key={index} className={classes.optionDivider} />;

                    return (
                        <Option
                            key={optionNormal.label}
                            {...optionNormal}
                            onSubmenuOpen={(isSubmenu: boolean, offsetY: number) => {
                                setOpenSubmenu(isSubmenu ? index : -1);
                                setSubmenuY(offsetY);
                            }}
                            onSubmenuClose={() => {
                                setOpenSubmenu(-1);
                            }}
                            onSelect={() => onSelect?.(optionNormal, index)}
                            parentActive={submenuActive}
                            active={openSubmenu === index}
                        />
                    )
                })}
            </div>

            {/** Submenu flyout, if present */}
            { submenuActive && (
                <div 
                    className={classes.submenuWrapper}
                    style={{ top: submenuY - SUBMENU_Y_SHIFT }}
                >
                    <OptionsMenu
                        options={(options as MenuOption[])[openSubmenu]?.suboptions ?? []}
                        translucent={translucent} onSelect={onSelect}
                    />
                </div>
            )}
        </div>
    );

}

export default OptionsMenu;