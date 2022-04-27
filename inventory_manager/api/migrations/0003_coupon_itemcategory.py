# Generated by Django 4.0.3 on 2022-04-20 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_customer'),
    ]

    operations = [
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coupon_id', models.PositiveIntegerField(unique=True)),
                ('discount_rate', models.DecimalField(decimal_places=2, max_digits=4)),
                ('valid_from', models.DateField()),
                ('valid_end', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='ItemCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_id', models.IntegerField(unique=True)),
                ('category_name', models.CharField(max_length=40)),
            ],
        ),
    ]