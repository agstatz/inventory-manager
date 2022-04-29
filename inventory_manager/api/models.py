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


# model for table Department
class Department(models.Model):
    department_id = models.CharField(max_length=5, unique=True)
    department_name = models.CharField(max_length=40)

class Coupon(models.Model):
    coupon_id = models.CharField(unique=True, max_length=10)
    discount_rate = models.DecimalField(max_digits=4,decimal_places=2)
    valid_from = models.DateField()
    valid_end = models.DateField()

class ItemCategory(models.Model):
    category_id = models.IntegerField(unique=True)
    category_name = models.CharField(max_length=40)

class Transaction(models.Model):
    transaction_id = models.IntegerField(unique=True)
    transaction_date = models.DateField()
    total = models.IntegerField()
    customer_id = models.ForeignKey(Customer, on_delete=models.SET_NULL,null=True)
    coupon_id = models.ForeignKey(Coupon, on_delete=models.SET_NULL,null=True)
    #store_id = models.ForeignKey()
    #employee_id = models.ForeignKey()
    #item_id = models.ManyToManyField(ItemCategory)
