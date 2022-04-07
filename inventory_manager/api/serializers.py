from rest_framework import serializers
from .models import Department, Customer


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("id", "department_id", "department_name")


class POSTDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("department_id", "department_name")


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "id",
            "customer_id",
            "first_name",
            "last_name",
            "email_address",
            "address",
            "phone",
            "member",
        )


class POSTCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "id",
            "customer_id",
            "first_name",
            "last_name",
            "email_address",
            "address",
            "phone",
            "member",
        )
