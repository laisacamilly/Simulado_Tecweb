import styles from './Resumo.module.css';
import { useState, useEffect } from 'react';
import Star from '../assets/star.png';
import StarFilled from '../assets/starp.png';

function Resumo({ onClose, nome, preco, symbol, logo }) {

    const [ativo, setAtivo] = useState({
        symbol: symbol || "PETR4",
        name: nome || "",
        price: preco || 0,
        change: 0,
        change_percent: 0,
        high: null,
        low: null,
        open: null,
        previous_close: null,
        volume: null,
        logo: logo || "",
        historico: []
    });

    const [favoritado, setFavoritado] = useState(false);
    const [periodo, setPeriodo] = useState('1M');
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (!symbol) return;
        setCarregando(true);
        fetch(`http://localhost:8000/api/resumo/${symbol}/?period=${periodo}`)
            .then(res => res.json())
            .then(data => {
                if (!data.erro) setAtivo(prev => ({ ...prev, ...data }));
                setCarregando(false);
            })
            .catch(() => setCarregando(false));
    }, [symbol, periodo]);

    const positivo = ativo.change_percent >= 0;
    const cor = positivo ? '#22c55e' : '#ef4444';

    const gerarGrafico = (dados) => {
        if (!dados || dados.length === 0) return { linha: '', area: '' };
        const min = Math.min(...dados);
        const max = Math.max(...dados);
        const w = 600; const h = 120; const pad = 5;
        const pontos = dados.map((v, i) => {
            const x = pad + (i / (dados.length - 1)) * (w - pad * 2);
            const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
            return `${x},${y}`;
        });
        return {
            linha: `M ${pontos.join(' L ')}`,
            area: `M ${pontos[0]} L ${pontos.join(' L ')} L ${w - pad},${h} L ${pad},${h} Z`
        };
    };

    const grafico = gerarGrafico(ativo.historico);

    const toggleFavorito = () => {
        if (!favoritado) {
            fetch("http://localhost:8000/api/favoritos/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symbol: ativo.symbol, name: ativo.name, price: ativo.price })
            });
        } else {
            fetch("http://localhost:8000/api/favoritos/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symbol: ativo.symbol })
            });
        }
        setFavoritado(!favoritado);
    };

    return (
        <div className={styles.fundo} onClick={onClose}>
            <div className={styles.caixa} onClick={(e) => e.stopPropagation()}>

                {/* FECHAR */}
                <button className={styles.fechar} onClick={onClose}>✕</button>

                {/* TOPO */}
                <div className={styles.topo}>
                    <div className={styles.topo_esq}>
                        <div className={styles.circulo}>
                            <img src={ativo.logo} alt={ativo.symbol} width="50" height="50"
                                onError={(e) => { e.target.style.display = 'none' }} />
                        </div>
                        <div>
                            <p className={styles.symbol}>{ativo.symbol}</p>
                            <p className={styles.nome}>{ativo.name}</p>
                        </div>
                    </div>
                    <img
                        src={favoritado ? StarFilled : Star}
                        alt="favoritar"
                        width="26"
                        onClick={toggleFavorito}
                        className={styles.star}
                    />
                </div>

                {/* PREÇO */}
                <div className={styles.preco_bloco}>
                    <p className={styles.preco}>R$ {ativo.price?.toFixed(2)}</p>
                    <span className={styles.variacao} style={{ color: cor }}>
                        {positivo ? '▲' : '▼'} {Math.abs(ativo.change_percent)?.toFixed(2)}%
                    </span>
                </div>

                {/* ATUALIZAÇÃO */}
                {ativo.last_update && (
                    <p className={styles.atualizacao}>
                        Atualizado em: {new Date(ativo.last_update).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                    </p>
                )}

                {/* PERÍODO */}
                <div className={styles.periodos}>
                    {['1D', '1W', '1M', '3M', '1Y'].map(p => (
                        <button
                            key={p}
                            className={`${styles.periodo_btn} ${periodo === p ? styles.periodo_ativo : ''}`}
                            onClick={() => setPeriodo(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* GRÁFICO */}
                <div className={styles.grafico_container}>
                    {carregando ? (
                        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '40px 0' }}>
                            Carregando...
                        </p>
                    ) : (
                        <svg viewBox="0 0 600 120" preserveAspectRatio="none" className={styles.grafico}>
                            <defs>
                                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={cor} stopOpacity="0.3" />
                                    <stop offset="100%" stopColor={cor} stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d={grafico.area} fill="url(#grad)" />
                            <path d={grafico.linha} fill="none" stroke={cor} strokeWidth="2" />
                        </svg>
                    )}
                </div>

                {/* CARDS */}
                <div className={styles.detalhes}>
                    {[
                        ['Abertura', ativo.open ? `R$ ${ativo.open?.toFixed(2)}` : '-'],
                        ['Fechamento', ativo.previous_close ? `R$ ${ativo.previous_close?.toFixed(2)}` : '-'],
                        ['Máxima', ativo.high ? `R$ ${ativo.high?.toFixed(2)}` : '-'],
                        ['Mínima', ativo.low ? `R$ ${ativo.low?.toFixed(2)}` : '-'],
                        ['Volume', ativo.volume ? ativo.volume?.toLocaleString('pt-BR') : '-'],
                        ['Variação', ativo.change ? `R$ ${ativo.change?.toFixed(2)}` : '-'],
                    ].map(([label, valor], i) => (
                        <div key={label} className={styles.card}>
                            <p className={styles.card_label}>{label}</p>
                            <p className={styles.card_valor} style={{ color: i === 5 ? cor : 'white' }}>{valor}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Resumo;