# Generated by Django 4.0.3 on 2022-05-02 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_item_item_price'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='customer',
            index=models.Index(fields=['last_name'], name='api_custome_last_na_921d20_idx'),
        ),
        migrations.AddIndex(
            model_name='employee',
            index=models.Index(fields=['first_name'], name='api_employe_first_n_4c9d1a_idx'),
        ),
        migrations.AddIndex(
            model_name='employee',
            index=models.Index(fields=['last_name'], name='api_employe_last_na_48544a_idx'),
        ),
        migrations.AddIndex(
            model_name='store',
            index=models.Index(fields=['store_address'], name='api_store_store_a_6fd858_idx'),
        ),
    ]