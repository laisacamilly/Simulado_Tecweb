// Import do css do Menu:
import styles from './Menu.module.css';
import User from '../assets/user.png';

function Menu( {onClose} ){

    return(

    <>

    <div className={styles.fundo} onClick={onClose}>

        <div className={styles.caixa_menu} onClick={(e) => e.stopPropagation()}>

            <div className={styles.user}>
                <img src={User} width={'100px'} height={'100px'}></img>

                <p className={styles.nome}> Láisa Camilly </p>
            </div>

            {/* Caixa dos itens que tem no menu */}
            <div className={styles.caixa_itens}>

                <a className={styles.ativo}> Minha Conta </a>
                <a> Configurações </a>
                <a> Sair </a>

            </div>

        </div>
    
    </div>

    </>

    );
}

export default Menu;