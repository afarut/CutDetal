# Generated by Django 5.0.2 on 2024-03-04 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_material_price_by_square_meter'),
    ]

    operations = [
        migrations.AddField(
            model_name='detail',
            name='count',
            field=models.PositiveIntegerField(default=1),
        ),
    ]