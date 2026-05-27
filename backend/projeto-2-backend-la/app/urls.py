from django.urls import path
from .views import busca_ativos, destaques, favoritos, resumo_ativo, search_ativos

urlpatterns = [
    path("busca_ativos/", busca_ativos),
    path("destaques/", destaques),
    path("favoritos/", favoritos),
    path("resumo/<str:symbol>/", resumo_ativo),
    path("search/", search_ativos),
    
]