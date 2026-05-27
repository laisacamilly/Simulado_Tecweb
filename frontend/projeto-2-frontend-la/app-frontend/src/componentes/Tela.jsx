import styles from './Tela.module.css';

import Des from '../assets/destaque.png';

import Header from './Header.jsx';
import CartaoAtivo from './CartaoAtivo.jsx';
import Divisoria from './Divisoria.jsx';
import Sidebar from './Sidebar.jsx';

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function Tela( {abrirMenu} ){

    const [ativos, setAtivos] = useState([]);
    const [destaques, setDestaques] = useState([]);
    const [busca, setBusca] = useState("");


    // Busca os destaques ao carregar a página:
    useEffect(() => {
        fetch("http://localhost:8000/api/destaques/")
            .then(res => res.json())
            .then(data => setDestaques(data));
    }, []);

    // Busca por símbolo:
    const buscarAtivo = () => {
        if (!busca) return;
        fetch(`http://localhost:8000/api/search/?q=${busca}`)
            .then(res => res.json())
            .then(data => setAtivos(data));
    };

    return(
        <>
        <Sidebar />
        <Header abrirMenu={abrirMenu} />

        <main>

            {/* BUSCA */}
            <div className={styles.caixa_busca}>
                <input 
                  className={styles.barra} 
                  type="text" 
                  placeholder="Buscar por PETR4, Itaú, Vale..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <button className={styles.botao} onClick={buscarAtivo}>Buscar</button>
            </div>

            {/* TESTEE 
            <CartaoAtivo></CartaoAtivo> */}

            {/* RESULTADO DA BUSCA: */}
            {ativos.length > 0 && (
                <div className={styles.caixa_cartao}>
                    {ativos.map((item) => (
                        <CartaoAtivo
                          key={item.symbol}
                          nome={item.name}
                          preco={item.price}
                          symbol={item.symbol}
                          logo = {item.logo}
                        />
                    ))}
                </div>
            )}

            {/* TRENDINGS: */}
            <div className={styles.caixa_titulo}>
                <div className={styles.caixa_icon}>
                    <img src={Des} width="30" />
                    <p className={styles.padrao}>Trendings</p>
                </div>
                <Divisoria />
                <Link className={styles.todos} to='/destaques'>Ver todos ＞</Link>
            </div>

            <div className={styles.caixa_cartao}>
                {destaques.slice(0, 3).map((item) => (
                    <CartaoAtivo
                      key={item.symbol}
                      nome={item.name}
                      preco={item.price}
                      symbol={item.symbol}
                      logo={item.logo}
                    />
                ))}
            </div>

        </main>
        </>
    );
}

export default Tela;