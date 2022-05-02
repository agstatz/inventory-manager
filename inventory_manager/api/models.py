from django.db import models

# model for table Customer
class Customer(models.Model):
    customer_id = models.IntegerField(unique=True)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email_address = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    member = models.BooleanField()

    class Meta:
        indexes = [
            models.Index(fields=['first_name']),
            models.Index(fields=['last_name']),
        ]


# model for table Department
class Department(models.Model):
    department_id = models.CharField(max_length=5, unique=True)
    department_name = models.CharField(max_length=40)

class Coupon(models.Model):
    coupon_id = models.CharField(unique=True, max_length=10)
    discount_rate = models.DecimalField(max_digits=4,decimal_places=2)
    valid_from = models.DateField()
    valid_end = models.DateField()

class Item(models.Model):
    item_id = models.CharField(unique=True, max_length=10)
    name = models.CharField(max_length=40)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=8,decimal_places=2)
    category_id = models.CharField(null=True,max_length=10)
    store_id = models.CharField(null=True,max_length=10)

class ItemCategory(models.Model):
    category_id = models.CharField(unique=True, max_length=10)
    category_name = models.CharField(max_length=40)

class Transaction(models.Model):
    transaction_id = models.IntegerField(unique=True,null=True)
    transaction_date = models.DateField()
    total = models.DecimalField(max_digits=10,decimal_places=2)
    customer_id = models.IntegerField(null=True)
    coupon_id = models.CharField(null=True,max_length=10)
    store_id = models.CharField(null=True,max_length=10)
    employee_id = models.IntegerField(null=True)
    items_id = models.CharField(null=False,max_length=80)

class Store(models.Model):
    store_id = models.CharField(unique=True, max_length=10)
    store_address = models.CharField(max_length=40)
    store_city = models.CharField(null=True, max_length=40)
    store_country = models.CharField(null=True, max_length=40)

    class Meta:
        indexes = [
            models.Index(fields=['store_address']),
        ]
    
class Employee(models.Model):
    employee_id = models.IntegerField(unique=True)
    department_id = models.CharField(max_length=5) 
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    job_title = models.CharField(max_length=20)
    salary = models.DecimalField(max_digits=11,decimal_places=2)  
    store = models.CharField(max_length=10, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['first_name']),
            models.Index(fields=['last_name']),
        ]
    
