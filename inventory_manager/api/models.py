from django.db import models

# Create your models here.
class Department(models.Model):
    department_id = models.CharField(max_length=5, unique=True)
    department_name = models.CharField(max_length=40)