import { NavLink } from "react-router-dom";

import styles from './Sidebar.module.css';
import Logo from '../assets/logo.png';

function Sidebar() {


  return (

    <>

    {/* Itens da lateral: */}
    <div className={styles.sidebar}>

      {/* Logo: */}
      <NavLink to = '/'><img src={Logo} alt='logo do app' width='100px' height='100px'></img></NavLink>
      
      <div className={styles.menu}>

        <NavLink to="/" className={({ isActive }) => isActive ? ` ${styles.ativo}` : styles.nada}>
          Início
        </NavLink>

         <NavLink to="/favoritos" className={({ isActive }) => isActive ? ` ${styles.ativo}`: styles.nada}>
          Favoritos
        </NavLink>

        <NavLink to="/destaques" className={({ isActive }) => isActive ? ` ${styles.ativo}` : styles.nada}>
          Trendings
        </NavLink>

        <NavLink to="/email" className={({ isActive }) => isActive ? ` ${styles.ativo}` : styles.nada}>
          Send Email
        </NavLink>

        <a>Notícias</a>
        <a>Ranking</a> 

      </div>

    </div>

    </>
  );
};

export default Sidebar;
