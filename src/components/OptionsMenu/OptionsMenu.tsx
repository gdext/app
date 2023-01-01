import { useState } from 'react';
import cn from 'classnames';

import Option, { MenuOption } from './components/Option';

import classes from './OptionsMenu.module.scss';


const SUBMENU_Y_SHIFT = 8;

type OptionsMenuProps = {
    title?: string;
    options: MenuOption[];
    translucent?: boolean;
}

const OptionsMenu = ({
    title, options, translucent
}: OptionsMenuProps) => {

    const [ openSubmenu, setOpenSubmenu ] = useState(-1);
    const [ submenuY, setSubmenuY ] = useState(0);

    const submenuActive = openSubmenu > -1;

    return (
        <div className={cn(classes.container, {
            [classes.translucent]: translucent
        })}>

            {/** Menu Title */}
            {title && <h4>{title}</h4>}

            {/** Menu Options */}
            <div className={classes.options}>
                {options.map((option, index) => (
                    <Option
                        key={option.label}
                        {...option}
                        onSubmenuOpen={(isSubmenu: boolean, offsetY: number) => {
                            setOpenSubmenu(isSubmenu ? index : -1);
                            setSubmenuY(offsetY);
                        }}
                        onSubmenuClose={() => {
                            setOpenSubmenu(-1);
                        }}
                        parentActive={submenuActive}
                        active={openSubmenu === index}
                    />
                ))}
            </div>

            {/** Submenu flyout, if present */}
            { submenuActive && (
                <div 
                    className={classes.submenuWrapper}
                    style={{ top: submenuY - SUBMENU_Y_SHIFT }}
                >
                    <OptionsMenu
                        options={options[openSubmenu]?.suboptions ?? []}
                        translucent={translucent}
                    />
                </div>
            )}
        </div>
    );

}

export default OptionsMenu;