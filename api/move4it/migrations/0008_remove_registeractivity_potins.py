# Generated by Django 5.0.6 on 2024-06-28 20:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('move4it', '0007_registeractivity_is_completed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='registeractivity',
            name='potins',
        ),
    ]
