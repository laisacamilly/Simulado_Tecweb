import styles from './CaixaEmail.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import Moldura from '../assets/moldura.png';

function CaixaEmail() {

    const [email, setEmail] = useState('');
    const [ativo, setAtivo] = useState('');

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !ativo) {
            alert("Preencha todos os campos");
            return;
        }

        const subject = `Resumo do ${ativo}`;

        const body = `Olá!

        📊 Segue um panorama atualizado do desempenho do ${ativo}:

            💰 Preço atual: R$ 49,79
            📈 Variação: +0,59%
            🕒 Última atualização: 30/04/2026 às 23:00

        📊 Indicadores do período (1 mês):

            🔓 Abertura: R$ 49,70
            🔒 Fechamento: R$ 49,50
            📈 Máxima: R$ 50,48
            📉 Mínima: R$ 49,51
            🔄 Volume: 1.203.600
            💵 Variação absoluta: +R$ 0,29
        
        📉 Ao longo do último mês, o ativo apresentou oscilações moderadas, atingindo sua máxima próxima de R$ 50,48
        e encerrando o período com leve valorização, indicando estabilidade com viés positivo.

        Obrigada por usar a KYRA! 🚀`;

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(gmailUrl, "_blank");

    }

    return (
        <div className={styles.fundo}>

            <div className={styles.caixa_email}>

                {/* Botão fechar */}
                <button 
                    type="button"
                    className={styles.fechar} 
                    onClick={() => navigate('/')}
                >
                    ✕
                </button>

                <h2 className={styles.titulo}>Enviar resumo do ativo</h2>

                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.campo}>
                        <label>Escolha o ativo</label>

                        <select 
                            value={ativo} 
                            onChange={(e) => setAtivo(e.target.value)}
                        >   

                            <option value="">Selecione...</option>

                            <option value="AAPL">AAPL - Apple</option>
                            <option value="PSSA3">PSSA3 - Porto</option>
                            <option value="TSLA">TSLA - Tesla</option>
                            <option value="PETR4">PETR4 - Petrobras</option>
                        </select>
                    </div>

                    <div className={styles.campo}>
                        <label>Digite seu email</label>

                        <input
                            type="email"
                            placeholder="seuemail@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.botao}>
                        Enviar por email
                    </button>

                </form>

            </div>
        </div>
    );
}

export default CaixaEmail;