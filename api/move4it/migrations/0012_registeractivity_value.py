# Generated by Django 5.0.6 on 2024-07-04 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('move4it', '0011_remove_registeractivity_file_activity_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='registeractivity',
            name='value',
            field=models.FloatField(blank=True, null=True, verbose_name='valor'),
        ),
    ]