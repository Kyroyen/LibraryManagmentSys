# Generated by Django 5.0.4 on 2024-04-12 18:05

import utils.hex_uuid
from django.db import migrations, models



class Migration(migrations.Migration):

    dependencies = [
        ('lms', '0003_populate_fire_id_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='libraryuser',
            name='fire_id',
            field=models.CharField(default=utils.hex_uuid.get_uuid_hexed, editable=False, max_length=128, unique=True),
        ),
    ]
