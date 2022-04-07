from rest_framework import serializers
from .models import Department
from .models import Coupon

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("id", "department_id", "department_name")


class POSTDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("department_id", "department_name")

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ("coupon_id","discount_rate","valid_from","valid_end")

class POSTCouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ("coupon_id","discount_rate","valid_from","valid_end")
