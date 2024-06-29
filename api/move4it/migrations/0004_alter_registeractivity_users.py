# Generated by Django 5.0.6 on 2024-06-28 17:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('move4it', '0003_alter_group_options_alter_registeractivity_options_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='registeractivity',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='users', to=settings.AUTH_USER_MODEL, verbose_name='usuario'),
        ),
    ]
