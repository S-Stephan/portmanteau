# Generated by Django 3.2.9 on 2021-12-23 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portmanteau_app', '0004_auto_20211217_2112'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='brand',
            field=models.CharField(default=1, max_length=64),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='item',
            name='image_url',
            field=models.TextField(default='1', max_length=2000),
            preserve_default=False,
        ),
    ]
