import styles from './Favoritos.module.css';
import Fav from '../assets/fav.png';
import Header from './Header.jsx';
import CartaoAtivo from './CartaoAtivo.jsx';
import Divisoria from './Divisoria.jsx';
import Sidebar from './Sidebar.jsx';
import { useEffect, useState } from 'react';

function Favoritos( {abrirMenu} ) {
    const [favoritos, setFavoritos] = useState([]);

    const carregarFavoritos = () => {
        fetch("http://localhost:8000/api/favoritos/")
            .then(res => res.json())
            .then(data => setFavoritos(data));
    };

    useEffect(() => {
        carregarFavoritos();
    }, []);

    return(
        <>
        <Sidebar />
        <Header abrirMenu={abrirMenu} />
        <main>
            <div className={styles.caixa_titulo}>
                <div className={styles.caixa_icon}>
                    <img src={Fav} width="30" />
                    <p className={styles.padrao}>Favoritos</p>
                </div>
                <Divisoria />
            </div>

            {favoritos.length === 0 && (
                <p style={{color: 'gray', textAlign: 'center', marginTop: '20px'}}>
                    Nenhum favorito ainda.
                </p>
            )}

            {favoritos.map((item) => (
                <CartaoAtivo
                    key={item.symbol}
                    nome={item.name}
                    preco={item.price}
                    symbol={item.symbol}
                    logo={`https://icons.brapi.dev/icons/${item.symbol}.svg`}
                    jaFavoritado={true}
                    aoDesfavoritar={carregarFavoritos}
                />
            ))}
        </main>
        </>
    );
};

export default Favoritos;