# Generated by Django 5.0.6 on 2024-06-28 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_previousillnesse_options_alter_profile_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(blank=True, choices=[('M', 'Masculino'), ('F', 'Femenino')], max_length=30, null=True, verbose_name='Género'),
        ),
    ]
