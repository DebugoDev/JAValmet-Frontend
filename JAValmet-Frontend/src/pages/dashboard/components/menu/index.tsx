import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import type { ReactNode } from 'react';

import style from "./style.module.css";

interface SideMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    children?: ReactNode;
}

const Menu = ({ isOpen, onToggle, children }: SideMenuProps) => {
    return (
        <>
            <button className={style.toggleButton} onClick={onToggle}>
                {isOpen ? <ArrowBackIosNewIcon fontSize='small' /> : <ArrowForwardIosIcon fontSize='small' />}
            </button>
            <div className={`${style.container} ${isOpen ? style.open : style.closed}`}>
                {children}
            </div>
        </>
    );
};

export default Menu;
