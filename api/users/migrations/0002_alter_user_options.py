# Generated by Django 5.0.2 on 2024-03-02 04:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': ['-created', '-modified']},
        ),
    ]
