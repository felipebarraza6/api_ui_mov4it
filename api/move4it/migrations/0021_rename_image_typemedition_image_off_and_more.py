# Generated by Django 5.0.6 on 2024-07-05 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('move4it', '0020_typemedition_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='typemedition',
            old_name='image',
            new_name='image_off',
        ),
        migrations.AddField(
            model_name='typemedition',
            name='image_on',
            field=models.ImageField(blank=True, null=True, upload_to='activities/', verbose_name='imagen'),
        ),
    ]
