# Generated by Django 5.0.2 on 2024-03-19 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_detail_incut'),
    ]

    operations = [
        migrations.AddField(
            model_name='material',
            name='price_by_incut',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
