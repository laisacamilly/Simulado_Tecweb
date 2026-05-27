import styles from './CartaoAtivo.module.css';
import Star from '../assets/star.png';
import StarFilled from '../assets/starp.png';
import Resumo from './Resumo';
import { useState } from 'react';

function CartaoAtivo({ nome, preco, symbol, logo, jaFavoritado = false, aoDesfavoritar }){

    const [favoritado, setFavoritado] = useState(jaFavoritado);
    const [aberto, setAberto] = useState(false);

    const toggleFavorito = (e) => {
        e.stopPropagation(); // evita abrir o popup ao clicar na estrela
        if (!favoritado) {
            fetch("http://localhost:8000/api/favoritos/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symbol, name: nome, price: preco })
            });
        } else {
            fetch("http://localhost:8000/api/favoritos/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symbol })
            }).then(() => {
                if (aoDesfavoritar) aoDesfavoritar();
            });
        }
        setFavoritado(!favoritado);
    };

    return(
        <>
        {aberto && (
            <Resumo
                onClose={() => setAberto(false)}
                nome={nome}
                preco={preco}
                symbol={symbol}
                logo={logo}
            />
        )}

        <div className={styles.caixa_cartao}>
            <div className={styles.cartao} onClick={() => setAberto(true)}>
                <img className={styles.imagem} src={logo} alt='logo do ativo' width='70px' height='70px' onError={(e) => { e.target.style.display = 'none' }} />
                <p className={styles.titulo}>{nome}</p>
                <p className={styles.titulo}>R$ {preco}</p>
                <img 
                    src={favoritado ? StarFilled : Star} 
                    alt='favoritar' 
                    width='30px' 
                    height='30px' 
                    style={{cursor:'pointer'}}
                    onClick={toggleFavorito}
                />
            </div>
        </div>
        </>
    );
}

export default CartaoAtivo;