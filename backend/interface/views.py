from django.shortcuts import render
from rest_framework import viewsets
from .serializers import InterfaceSerializer
from .models import Interface

# Create your views here.

class InterfaceView(viewsets.ModelViewSet):
    serializer_class = InterfaceSerializer
    queryset = Interface.objects.all()