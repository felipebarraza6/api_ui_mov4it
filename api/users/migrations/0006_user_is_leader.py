# Generated by Django 5.0.3 on 2024-03-16 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_user_group_participation'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_leader',
            field=models.BooleanField(default=True, help_text='Se establece en verdadero cuando el usuario es lider de su grupo', verbose_name='es lider'),
        ),
    ]
