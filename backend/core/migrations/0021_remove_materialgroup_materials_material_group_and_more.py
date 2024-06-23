# Generated by Django 5.0.2 on 2024-06-23 19:22

import core.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0020_remove_material_price_by_incut_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='materialgroup',
            name='materials',
        ),
        migrations.AddField(
            model_name='material',
            name='group',
            field=models.ForeignKey(default=core.models.get_default_group_id, on_delete=django.db.models.deletion.CASCADE, related_name='materials', to='core.materialgroup'),
        ),
        migrations.AlterField(
            model_name='material',
            name='thickness',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='materialgroup',
            name='cut_type',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='materialgroup',
            name='name',
            field=models.CharField(max_length=255),
        ),
    ]
