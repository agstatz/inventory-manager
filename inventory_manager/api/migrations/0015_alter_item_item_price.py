# Generated by Django 4.0.3 on 2022-05-02 01:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_employee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='item_price',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
    ]
