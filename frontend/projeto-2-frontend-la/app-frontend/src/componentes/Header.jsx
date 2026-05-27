import styles from './Header.module.css';

import { useState } from 'react';

//Componentes:
import './Menu.jsx';
import Divisoria from './Divisoria';

// Imagem:
import Menu from '../assets/menu.png';

function Header( {abrirMenu} ){

    return (
        <>
        {/*Header:*/}
        <header>


            <div className={styles.caixa}>
                <p className={styles.titulo}>K Y R A</p>
                <img onClick={abrirMenu} src={Menu} alt='logo do menu' width='100px' height='100px'></img>
            </div>

        </header>

        </>
    );
};

export default Header;