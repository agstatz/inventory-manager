from django.db import models

class Employee(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=10)
    job_title = models.CharField(max_length=30)
    salary = models.IntegerField()

class Department(models.Model):
    department_id = models.IntegerField(primary_key=True)
    department_name = models.CharField(max_length=40)

class Location(models.Model):
    location_id = models.IntegerField(primary_key=True)
    street = models.CharField(max_length=40)
    city = models.CharField(max_length=40)
    country = models.CharField(max_length=40)


class ItemCategory(models.Model):
    category_id = models.IntegerField(primary_key=True)
    category_name = models.CharField(max_length=40)

class Item(models.Model):
    item_id = models.IntegerField(primary_key=True)
    item_name = models.CharField(max_length=40)
    quantity = models.IntegerField()
    weight = models.IntegerField()
    price = models.FloatField()
    category_id = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)

class Members(models.Model):
    member_id = models.IntegerField(primary_key=True)


class Interface(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title