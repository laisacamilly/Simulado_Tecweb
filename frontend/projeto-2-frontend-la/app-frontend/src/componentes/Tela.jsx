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

    // ===== SIMULADO: =====
    // PRA APARECER NA TELA PRINCIPAL O EMAIL DO USUARIO:
    

    // 0.) Constantes aqui...
    // Constante do token pra aparecer na tela simulado:
    const [token, setToken] = useState(""); // string.

    // Constante para ver exercicios:
    const [exe, setExe] = useState([]); // lista, dic.

    // Constante pra pegar email do usuário:
    const [email, setEmail] = useState("");

    // ===== PRA PEGAR O TOKEN: =====
    useEffect( () => {

        // 1.) o FETCH faz a requisição para a API:

        fetch("https://tecweb-js.insper-comp.com.br/token", //URL

            {   method: "POST",
                
                headers: { "Content-Type": "application/json","Accept": "application/json",},

                body: JSON.stringify( { username: "laisaco1",} ),

            }
        )

        // 2.) Quando a resposta do fetch chega, que é o 'res': response, a gnt transforma ela em json:
        // Transforma resposta em JSON:
        .then(res => res.json())

        // 3.) Agora você pega o json convertido e printa ele:
        // Pega os 'dados': o json convertidos:
        .then(dados => {
            // Pra printar:
            console.log(dados);
            console.log(dados.accessToken);

            // Pra mostrar na tela:
            setToken(dados.accessToken);
        });


    }, []); // roda uma ve só a pagina. (roda = carrega), se não quiser rodar só uma vez tira esse []

    // ===== PRA PEGAR A LISTA DE EXERCÍCIOS: =====
    useEffect( () => {

        if (!token) return;

        fetch('https://tecweb-js.insper-comp.com.br/exercicio',

            {method: "GET",

                headers: { "Content-Type": "application/json", "Accept": "application/json",
                "Authorization": `Bearer ${token}`, }, // pra pegar o token pq criei a constante token lá em cima

            }

        )

        .then(res => res.json())

        .then(exercicios => {
            console.log(exercicios);

            // pra mostrar na tela:
            setExe(exercicios);

            // ===== PRA OBTER EMAIL DE USUÁRIO: =====

            // Pra printar:
            console.log(exercicios['nome-do-usuario'].entrada.email)

            // Pra mostrar na tela: Cria outro const dentro do then
            const emailU = exercicios['nome-do-usuario'].entrada.email;

            setEmail(emailU);

        })



    }, [token]); // roda uma vez com o token recebido.

    return(
        <>
        <Sidebar />
        <Header abrirMenu={abrirMenu} />

        <main>

            <div className ={styles.caixa_simulado}>

                {/* Email do usuário: */}
                <div className = {styles.email}>
                    <p> Email do Usuário: {email}</p>
                </div>

                {/* Botão pra simulado: */}
                <button className = {styles.botaoS}>
                    <Link className={styles.todos} to='/simulado'> Simulado </Link>
                </button>
            
            </div>

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