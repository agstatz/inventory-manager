from rest_framework import serializers
from .models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'department_id', 'department_name')

class POSTDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('department_id', 'department_name')