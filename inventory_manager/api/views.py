from django.shortcuts import render
from rest_framework import generics, status
from .serializers import DepartmentSerializer, POSTDepartmentSerializer
from .models import Department
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class DepartmentView(generics.CreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class POSTDepartmentView(APIView):
    serializer_class = POSTDepartmentSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            department_id = serializer.data.get('department_id')
            department_name = serializer.data.get('department_name')
            queryset = Department.objects.filter(department_id=department_id)
            
            if queryset.exists():
                dept = queryset[0]
                dept.department_name = department_name
                dept.save(update_fields=['department_name'])
            else:
                dept = Department(department_id=department_id, department_name=department_name)
                dept.save()
            
            return Response(DepartmentSerializer(dept).data, status=status.HTTP_201_CREATED)
        