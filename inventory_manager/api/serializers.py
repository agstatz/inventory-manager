from rest_framework import serializers
from .models import Department, Customer,Coupon, ItemCategory,Item,Transaction, Store, Employee

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
        fields = ("coupon_id","discount_rate","valid_from","valid_end",)

class POSTCouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ("coupon_id","discount_rate","valid_from","valid_end",)

#ITEM
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ("item_id","name", "quantity","price", "category_id", "store_id")

class POSTItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ("item_id","name", "quantity","price", "category_id", "store_id")


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



#ITEMCATEGORY
class ItemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = ("category_id","category_name")

class POSTItemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = ("category_id","category_name")



#TRANSACTION
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ("transaction_id","transaction_date","total","customer_id","coupon_id","store_id","employee_id","items_id")

class POSTTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ("transaction_id","transaction_date","total","customer_id","coupon_id","store_id","employee_id","items_id")



#STORE
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ("store_id","store_address", "store_city", "store_country")

class POSTStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ("store_id","store_address", "store_city", "store_country")

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            "id",
            "employee_id",
	        "department_id", 
	        "first_name", 
            "last_name" ,
	        "email" ,
            "address",
            "phone", 
            "job_title", 
            "salary" 
        )

class POSTEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            "id",
            "employee_id",
	        "department_id", 
	        "first_name", 
            "last_name" ,
	        "email" ,
            "address",
            "phone", 
            "job_title", 
            "salary" 
        )
        
        
        

        
        
