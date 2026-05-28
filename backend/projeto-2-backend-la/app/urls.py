from django.urls import path
from .views import busca_ativos, destaques, favoritos, resumo_ativo, search_ativos, funfact, delete

urlpatterns = [
    path("busca_ativos/", busca_ativos),
    path("destaques/", destaques),
    path("favoritos/", favoritos),
    path("resumo/<str:symbol>/", resumo_ativo),
    path("search/", search_ativos),

    # Pro simulado:
    path("funfact/", funfact),

    path("funfact/<int:id>/", delete),
    
]