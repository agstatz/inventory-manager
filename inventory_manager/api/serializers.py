from rest_framework import serializers
from .models import Department, Customer,Coupon, ItemCategory

#DEPT
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("id", "department_id", "department_name")


class POSTDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("department_id", "department_name")

#COUPON
class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ("coupon_id","discount_rate","valid_from","valid_end")

class POSTCouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ("coupon_id","discount_rate","valid_from","valid_end")

#CUSTOMER
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

class ItemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = ("category_id","category_name")

#class POSTItemCategorySerializer(serializers.ModelSerializer):
#    class Meta:
#        model = ItemCategory
#        fields = ("category_id","category_name")