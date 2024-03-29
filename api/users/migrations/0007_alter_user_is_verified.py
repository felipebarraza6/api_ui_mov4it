# Generated by Django 5.0.3 on 2024-03-16 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_user_is_leader'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_verified',
            field=models.BooleanField(default=False, help_text='Se establece en verdadero cuando el usuario ha verificado su dirección de correo electrónico', verbose_name='vertificado'),
        ),
    ]
