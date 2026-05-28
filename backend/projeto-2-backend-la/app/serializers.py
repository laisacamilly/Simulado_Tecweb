# Pra traduzir de JSON pra python:

# SIMULADO ===========
from rest_framework import serializers
from .models import FunFact

# Pro FunFact:
class FunFactSerializer(serializers.ModelSerializer):

    class Meta:
        model = FunFact # Nome do model
        fields = ["id", "fact"] # Sempre vai ter id, e o que você colocar lá