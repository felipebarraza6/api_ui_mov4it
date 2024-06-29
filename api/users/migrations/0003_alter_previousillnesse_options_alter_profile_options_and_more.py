# Generated by Django 5.0.6 on 2024-06-28 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_gender'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='previousillnesse',
            options={'verbose_name': 'Enfermedad previa', 'verbose_name_plural': 'Enfermedades previas'},
        ),
        migrations.AlterModelOptions(
            name='profile',
            options={'verbose_name': 'Perfil', 'verbose_name_plural': 'Perfiles'},
        ),
        migrations.AlterModelOptions(
            name='sportactivity',
            options={'verbose_name': 'Deporte', 'verbose_name_plural': 'Deportes'},
        ),
        migrations.AlterField(
            model_name='user',
            name='identification_number',
            field=models.CharField(max_length=80, verbose_name='úmero de identificación(rut o pasaporte)'),
        ),
    ]