/* Import das Telas: */
import { useState } from "react";

import Tela from "./componentes/Tela";
import { Routes, Route } from "react-router-dom";
import Favoritos from "./componentes/Favoritos";
import Destaques from "./componentes/Destaques";
import Email from "./componentes/Email";
import Menu from "./componentes/Menu";

import Resumo from "./componentes/Resumo";

function App() {

  // Pra clicar fora do menu e sair:
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>

    <Routes>

        {/*Rota das páginas:*/}
        {/*Quando a URL for X, mostra tal componente:*/}

        <Route path="/" element={<Tela abrirMenu={() => setMenuAberto(true)} />} />
        {/*<Route path="/menu" element={<Menu />} />*/}
        <Route path="/favoritos" element={<Favoritos abrirMenu={() => setMenuAberto(true)} />} />
        <Route path="/destaques" element={<Destaques abrirMenu={() => setMenuAberto(true)} />} />
        <Route path="/email" element={<Email />} />

        <Route path="/resumo" element={<Resumo abrirMenu={() => setMenuAberto(true)} />} />

    </Routes>

      {/* MENU POR CIMA */}
      {menuAberto && (
        <Menu onClose={() => setMenuAberto(false)} />
      )}
    
    </>
  );

}

export default App;