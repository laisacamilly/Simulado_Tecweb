import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import dos Css:
import './globals.css';

// Import do App:
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>

      {/*Procura as rotas no app.jsx:*/}
      <App />

    </BrowserRouter>

  </StrictMode>
)
