import styles from './Email.module.css';

import Sidebar from './Sidebar';
import Header from './Header';

import CaixaEmail from './CaixaEmail';

//import Em from '../assets/emaail.png';

function Email ( {abrirMenu} ){
    
    return(

        <>

        {/* Rever aqui e colocar isso no aps.jsx */}
        <Sidebar />
        <Header abrirMenu={abrirMenu} />
        <CaixaEmail/>

        </>

    );
};

export default Email;