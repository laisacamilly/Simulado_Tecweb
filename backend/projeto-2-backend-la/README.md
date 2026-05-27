<strong> <h2> ✦ KYRA ✦ </h2> </strong>

> API REST desenvolvida com Django REST Framework para a plataforma KYRA de acompanhamento de ativos da B3.

<img width="1833" height="794" alt="image" src="https://github.com/user-attachments/assets/6d400917-295a-479c-98dc-913938c328bf" />

<h3> 🟣 Sobre o projeto </h3>

O **KYRA** é uma aplicação web para acompanhamento de ações brasileiras (B3). O backend é responsável por **consumir a API externa** [Real-Time Finance Data](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-finance-data) via RapidAPI, processar os dados e servir ao frontend via endpoints REST. Também gerencia os **ativos favoritados** pelo usuário em banco de dados SQLite.

<h3> 🟣 Link do Deploy </h3>
https://projeto-2-backend-la.onrender.com

---

<h3> 🟣 Funcionalidades </h3>

- 🔍 **Busca de ativos** — Busca por nome ou símbolo na B3.
- 📊 **Resumo do ativo** — Retorna preço, variação, máxima, mínima, volume e histórico para o gráfico.
- 🔥 **Trendings** — Retorna lista de ativos em alta com cache de 10 minutos para economizar requisições.
- ⭐ **Favoritos** — Salva, lista e remove ativos favoritados no banco de dados SQLite.

---

<h3> 🟣 Endpoints </h3>

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/search/?q={query}` | Busca ativos por nome ou símbolo |
| `GET` | `/api/destaques/` | Lista os ativos em destaque (com cache) |
| `GET` | `/api/resumo/{symbol}/?period={period}` | Retorna resumo completo + histórico do gráfico |
| `GET` | `/api/favoritos/` | Lista os favoritos salvos |
| `POST` | `/api/favoritos/` | Adiciona um ativo aos favoritos |
| `DELETE` | `/api/favoritos/` | Remove um ativo dos favoritos |

---

<h3> 🟣 Modelo de dados </h3>

### Favorito
| Campo | Tipo | Descrição |
|---|---|---|
| `symbol` | CharField | Símbolo do ativo (ex: PETR4) |
| `name` | CharField | Nome da empresa |
| `price` | FloatField | Preço no momento do favorito |

---

<h3> 🟣 Tecnologias </h3>

- [Django](https://www.djangoproject.com/) + [Django REST Framework](https://www.django-rest-framework.org/)
- SQLite
- Python Requests
- Django Cache Framework
- python-dotenv
- django-cors-headers
