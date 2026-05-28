{/* ===== SIMULADO PROVA: ===== */ }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from './Simulado.module.css';

function Simulado() {

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




    return (

        <>

        <div className = {styles.comeco}>

            <h1> Simulado da AF</h1>

            {/* Botão pra simulado: */}
            <button className = {styles.botaoS}>
                <Link className={styles.todos} to='/'> Voltar </Link>
            </button>

        </div>

        {/* Mostrar o token da tela: */}
        <h2> Obter o token: </h2>
        <p> Token gerado: </p>
        <p> {token} </p>

        {/* Mostrar os exercicios na tela: */}
        <h2> Exercícios: </h2>
        <p> {JSON.stringify(exe)} </p>

        {/* Email do usuário: */}
        <h2> Email do usuário: </h2>
        <p> {email} </p>

        </>

    );
};

export default Simulado;