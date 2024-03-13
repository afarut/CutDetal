import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_dxfsize'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detail',
            name='count',
            field=models.PositiveIntegerField(blank=True, null=True),

        ),
        migrations.AlterField(
            model_name='detail',
            name='material',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.material'),
        ),
        migrations.AlterField(
            model_name='detail',
            name='price',
            field=models.IntegerField(blank=True, null=True),

        ),
    ]
