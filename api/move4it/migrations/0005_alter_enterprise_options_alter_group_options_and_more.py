# Generated by Django 5.0.2 on 2024-03-09 03:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('move4it', '0004_enterprise_remove_approvedcourse_course_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='enterprise',
            options={'verbose_name': 'Empresa', 'verbose_name_plural': 'Empresas'},
        ),
        migrations.AlterModelOptions(
            name='group',
            options={'verbose_name': 'Equipos', 'verbose_name_plural': 'Equipo'},
        ),
        migrations.AlterField(
            model_name='enterprise',
            name='address',
            field=models.CharField(blank=True, max_length=1200, null=True, verbose_name='direccion'),
        ),
        migrations.AlterField(
            model_name='enterprise',
            name='email',
            field=models.EmailField(blank=True, max_length=1200, null=True, verbose_name='correo'),
        ),
        migrations.AlterField(
            model_name='enterprise',
            name='phone',
            field=models.CharField(blank=True, max_length=1200, null=True, verbose_name='telefono'),
        ),
    ]
