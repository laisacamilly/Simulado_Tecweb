from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
from django.conf import settings
from .models import Favorito

from django.core.cache import cache


BASE_URL = "https://real-time-finance-data.p.rapidapi.com/stock-quote"

@api_view(['GET'])
def search_ativos(request):
    query = request.GET.get("q", "")
    if not query:
        return Response([])

    headers = {
        "x-rapidapi-key": settings.RAPID_CHAVE,
        "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com"
    }

    try:
        r = requests.get(
            "https://real-time-finance-data.p.rapidapi.com/search",
            headers=headers,
            params={"query": query, "language": "en"}
        )
        data = r.json()["data"]

        # Pega só stocks brasileiros (BVMF):
        ativos = []
        for item in data.get("stock", []):
            if item.get("exchange") == "BVMF":
                symbol = item["symbol"].replace(":BVMF", "")
                ativos.append({
                    "symbol": symbol,
                    "name": item.get("name"),
                    "price": item.get("price"),
                    "logo": f"https://icons.brapi.dev/icons/{symbol}.svg",
                })

        return Response(ativos)

    except Exception as e:
        return Response({"erro": str(e)}, status=500)

def buscar_ativo(symbol):
    headers = {
        "x-rapidapi-key": settings.RAPID_CHAVE,
        "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com"
    }
    r = requests.get(BASE_URL, headers=headers, params={"symbol": f"{symbol.upper()}:BVMF", "language": "en"})
    data = r.json()["data"]
    return {
        "symbol": symbol.upper(),
        "name": data.get("name"),
        "price": data.get("price"),
        "change": data.get("change_percent"),
        "logo": f"https://icons.brapi.dev/icons/{symbol.upper()}.svg",
    }

# ===== BUSCA ATIVO =====
@api_view(['GET'])
def busca_ativos(request):
    symbol = request.GET.get("symbol", "PETR4")
    try:
        return Response([buscar_ativo(symbol)])
    except Exception as e:
        return Response({"erro": str(e)}, status=500)

# ===== DESTAQUES =====
@api_view(['GET'])
def destaques(request):

    # Tenta pegar do cache primeiro:
    cached = cache.get('destaques')
    if cached:
        return Response(cached)

    simbolos = "PSSA3:BVMF,PETR4:BVMF,VALE3:BVMF,ITUB4:BVMF,BBDC4:BVMF,WEGE3:BVMF"

    headers = {
        "x-rapidapi-key": settings.RAPID_CHAVE,
        "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com"
    }

    try:
        r = requests.get(
            "https://real-time-finance-data.p.rapidapi.com/stock-quote",
            headers=headers,
            params={"symbol": simbolos, "language": "en"}
        )
        data = r.json()

        ativos = []
        for item in data.get("data", []):
            symbol = item.get("symbol", "").replace(":BVMF", "")
            ativos.append({
                "symbol": symbol,
                "name": item.get("name"),
                "price": item.get("price"),
                "change": item.get("change"),
                "logo": f"https://icons.brapi.dev/icons/{symbol}.svg",
            })

        # Salva no cache por 10 minutos (600 segundos):
        cache.set('destaques', ativos, 600)

        return Response(ativos)

    except Exception as e:
        return Response({"erro": str(e)}, status=500)

# ===== FAVORITOS =====
@api_view(['GET', 'POST', 'DELETE'])
def favoritos(request):

    if request.method == 'GET':
        favs = Favorito.objects.all()
        return Response([{"symbol": f.symbol, "name": f.name, "price": f.price} for f in favs])

    if request.method == 'POST':
        symbol = request.data.get("symbol")
        name = request.data.get("name")
        price = request.data.get("price")
        if not symbol:
            return Response({"erro": "symbol obrigatório"}, status=400)
        fav, created = Favorito.objects.get_or_create(
            symbol=symbol,
            defaults={"name": name, "price": price}
        )
        return Response({"mensagem": "favoritado" if created else "já existe"})

    if request.method == 'DELETE':
        symbol = request.data.get("symbol")
        try:
            Favorito.objects.get(symbol=symbol).delete()
            return Response({"mensagem": "removido"})
        except Favorito.DoesNotExist:
            return Response({"erro": "não encontrado"}, status=404)
        
# ===== RESUMO =====
@api_view(['GET'])
def resumo_ativo(request, symbol):
    try:
        period = request.GET.get("period", "1M")
        headers = {
            "x-rapidapi-key": settings.RAPID_CHAVE,
            "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com"
        }

        # Chamada 1: time series pro gráfico
        r_series = requests.get(
            "https://real-time-finance-data.p.rapidapi.com/stock-time-series",
            headers=headers,
            params={"symbol": f"{symbol.upper()}:BVMF", "period": period, "language": "en"}
        )
        series_data = r_series.json()["data"]
        historico = [v["price"] for k, v in sorted(series_data["time_series"].items())]

        # Chamada 2: stock quote pras informações detalhadas
        r_quote = requests.get(
            "https://real-time-finance-data.p.rapidapi.com/stock-quote",
            headers=headers,
            params={"symbol": f"{symbol.upper()}:BVMF", "language": "en"}
        )
        quote_data = r_quote.json()["data"]

        return Response({
            "symbol": symbol.upper(),
            "name": quote_data.get("name"),
            "price": quote_data.get("price"),
            "change": quote_data.get("change"),
            "change_percent": quote_data.get("change_percent"),
            "high": quote_data.get("high"),
            "low": quote_data.get("low"),
            "open": quote_data.get("open"),
            "previous_close": quote_data.get("previous_close"),
            "volume": quote_data.get("volume"),
            "logo": f"https://icons.brapi.dev/icons/{symbol.upper()}.svg",
            "last_update": quote_data.get("last_update_utc"),
            "historico": historico

        })

    except Exception as e:
        return Response({"erro": str(e)}, status=500)


# ===== SIMULADO DA PROVA: =====
