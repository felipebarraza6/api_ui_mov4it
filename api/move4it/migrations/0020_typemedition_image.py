# Generated by Django 5.0.6 on 2024-07-05 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('move4it', '0019_remove_activity_is_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='typemedition',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='activities/', verbose_name='imagen'),
        ),
    ]