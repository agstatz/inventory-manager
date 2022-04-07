from django.db import models

# Create your models here.
class Department(models.Model):
    department_id = models.CharField(max_length=5, unique=True)
    department_name = models.CharField(max_length=40)

class Coupon(models.Model):
    coupon_id = models.PositiveIntegerField(unique=True)
    discount_rate = models.DecimalField(max_digits=4,decimal_places=2)
    valid_from = models.DateField()
    valid_end = models.DateField()