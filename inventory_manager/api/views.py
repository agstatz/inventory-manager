from django.shortcuts import render
from rest_framework import generics
from .serializers import DepartmentSerializer
from .models import Department

# Create your views here.

class DepartmentView(generics.CreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

