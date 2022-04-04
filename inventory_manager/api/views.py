from django.shortcuts import render
from rest_framework import generics, status
from .serializers import DepartmentSerializer, POSTDepartmentSerializer
from .models import Department
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

#
# Begin DEPARTMENT Views
#

class DepartmentView(generics.CreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class GETDepartmentView(APIView):
    serializer_class = DepartmentSerializer
    lookup_url_kwarg = 'department_id'

    def get(self, request, format=None):
        dept_id = request.GET.get(self.lookup_url_kwarg)
        if dept_id != None:
            dept = Department.objects.filter(department_id = dept_id)
            if len(dept) > 0:
                data = DepartmentSerializer(dept[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid Department ID.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            dept = DepartmentSerializer(Department.objects.all(), many=True).data
            return Response(dept, status=status.HTTP_200_OK) 

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

class DELETEDepartmentView(APIView):
    serializer_class = DepartmentSerializer
    lookup_url_kwarg = 'department_id'

    def delete(self, request, format=None):
        dept_id = request.GET.get(self.lookup_url_kwarg)
        if dept_id != None:
            dept = Department.objects.filter(department_id = dept_id)
            if len(dept) > 0:
                dept.delete()
                return Response({"Department deleted"}, status=status.HTTP_204_NO_CONTENT)
            return Response({'Bad Request': 'Invalid Department ID.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'Bad Request': 'Invalid Department ID.'}, status=status.HTTP_404_NOT_FOUND)

#
# End DEPARTMENT Views
#