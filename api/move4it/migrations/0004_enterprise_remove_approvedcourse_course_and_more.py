# Generated by Django 5.0.2 on 2024-03-05 03:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('move4it', '0003_blog_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='Enterprise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Fecha de modificacion.', verbose_name='modified at')),
                ('name', models.CharField(max_length=1200, verbose_name='nombre')),
                ('description', models.TextField(blank=True, max_length=1200, null=True, verbose_name='descripcion')),
                ('address', models.CharField(max_length=1200, verbose_name='direccion')),
                ('phone', models.CharField(max_length=1200, verbose_name='telefono')),
                ('email', models.EmailField(max_length=1200, verbose_name='correo')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='approvedcourse',
            name='course',
        ),
        migrations.RemoveField(
            model_name='approvedcourse',
            name='student',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='course',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='lesson',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
        migrations.RemoveField(
            model_name='course',
            name='stage',
        ),
        migrations.RemoveField(
            model_name='question',
            name='course',
        ),
        migrations.RemoveField(
            model_name='grouplessons',
            name='course',
        ),
        migrations.RemoveField(
            model_name='resource',
            name='course',
        ),
        migrations.RemoveField(
            model_name='viewcontent',
            name='course',
        ),
        migrations.RemoveField(
            model_name='lesson',
            name='group',
        ),
        migrations.RemoveField(
            model_name='viewcontent',
            name='lesson',
        ),
        migrations.RemoveField(
            model_name='resource',
            name='lesson',
        ),
        migrations.RemoveField(
            model_name='questionalternative',
            name='question',
        ),
        migrations.RemoveField(
            model_name='viewcontent',
            name='student',
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Fecha de modificacion.', verbose_name='modified at')),
                ('name', models.CharField(max_length=1200, verbose_name='nombre')),
                ('description', models.TextField(blank=True, max_length=1200, null=True, verbose_name='descripcion')),
                ('enterprise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='move4it.enterprise', verbose_name='empresa')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'abstract': False,
            },
        ),
        migrations.DeleteModel(
            name='AnswerComment',
        ),
        migrations.DeleteModel(
            name='ApprovedCourse',
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='Stage',
        ),
        migrations.DeleteModel(
            name='Course',
        ),
        migrations.DeleteModel(
            name='GroupLessons',
        ),
        migrations.DeleteModel(
            name='Lesson',
        ),
        migrations.DeleteModel(
            name='Resource',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
        migrations.DeleteModel(
            name='QuestionAlternative',
        ),
        migrations.DeleteModel(
            name='ViewContent',
        ),
    ]
