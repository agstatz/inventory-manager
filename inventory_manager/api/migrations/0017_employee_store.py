# Generated by Django 4.0.3 on 2022-05-02 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_customer_api_custome_last_na_921d20_idx_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='store',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
