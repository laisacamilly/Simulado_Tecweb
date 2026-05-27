'''
=== Pra criar um ambiente virtual: ===
python -m venv env

=== Pra ativar o ambiente virtual: ===
env\Scripts\Activate.ps1

=== depois: ===
pip install django
django-admin startproject getit .
python manage.py createsuperuser

python manage.py startapp app

=== Import e bibliotecas pra instalar: ===
pip install djangorestframework
pip install markdown
pip install django-filter

=== Quando mexer no models: ===
py manage.py makemigrations
py manage.py migrate


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
from django.conf import settings

@api_view(['GET'])
def favoritos(request):
    url = "https://yahoo-finance-real-time1.p.rapidapi.com/market/v2/get-quotes"

    querystring = {
        "symbols": "PETR4.SA,VALE3.SA,ITUB4.SA",
        "region": "BR"
    }

    headers = {
        "x-rapidapi-key": settings.RAPID_CHAVE,
        "x-rapidapi-host": "yahoo-finance-real-time1.p.rapidapi.com"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()

        data = response.json()

        # 🔥 organizar dados pro front
        ativos = []
        for item in data["quoteResponse"]["result"]:
            ativos.append({
                "symbol": item["symbol"],
                "name": item.get("shortName"),
                "price": item.get("regularMarketPrice"),
                "change": item.get("regularMarketChangePercent"),
            })

        return Response(ativos)

    except requests.exceptions.RequestException as e:
        return Response({"erro": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



        MEU:
        # imports:
from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

import requests
from rest_framework import status
from django.conf import settings

# === Create your views here: ===
@api_view(['GET'])

# Endpoint 1: Requisição.
def rota_api(request):

    base_url = 'https://yahoo-finance-real-time1.p.rapidapi.com'
    path = request.query_params.get('path')

    url = f"{base_url}/{path}"

    headers = {
        "x-rapidapi-key": settings.RAPID_CHAVE, #chave da api
        "x-rapidapi-host": "yahoo-finance-real-time1.p.rapidapi.com"
    }

    # pega todos os parâmetros (symbol, region, etc):
    params = request.query_params.dict()
    params.pop("path", None)  # remove o path dos params

    # Teste:
    print(settings.RAPID_CHAVE)

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()

        return Response(response.json())
    
    except requests.exceptions.RequestException as e:
        return Response(
            {"erro": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
'''