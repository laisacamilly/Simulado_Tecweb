import Header from "./Header";
import styles from './Destaques.module.css';
import CartaoAtivo from './CartaoAtivo';
import Divisoria from './Divisoria';
import Sidebar from './Sidebar';
import Des from '../assets/destaque.png';
import { useEffect, useState } from 'react';

function Destaques( {abrirMenu} ){
    const [destaques, setDestaques] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/destaques/")
            .then(res => res.json())
            .then(data => setDestaques(data));
    }, []);

    return(
        <>
        <Sidebar />
        <Header abrirMenu={abrirMenu} />
        <main>
            <div className={styles.caixa_titulo}>
                <div className={styles.caixa_icon}>
                    <img src={Des} width="30" />
                    <p className={styles.padrao}>Trendings</p>
                </div>
                <Divisoria />
            </div>

            {destaques.map((item) => (
                <CartaoAtivo
                    key={item.symbol}
                    nome={item.name}
                    preco={item.price}
                    symbol={item.symbol}
                    logo={item.logo}
                />
            ))}
        </main>
        </>
    );
};

export default Destaques;