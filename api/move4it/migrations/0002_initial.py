# Generated by Django 5.0.2 on 2024-02-28 23:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('move4it', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='answercomment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='usuario'),
        ),
        migrations.AddField(
            model_name='approvedcourse',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Estudiante'),
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='usuario'),
        ),
        migrations.AddField(
            model_name='answercomment',
            name='comment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='move4it.comment', verbose_name='comentario'),
        ),
        migrations.AddField(
            model_name='comment',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='move4it.course', verbose_name='etapa'),
        ),
        migrations.AddField(
            model_name='approvedcourse',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='move4it.course', verbose_name='Etapa'),
        ),
        migrations.AddField(
            model_name='grouplessons',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='move4it.course', verbose_name='Curso'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='move4it.grouplessons', verbose_name='Grupo'),
        ),
        migrations.AddField(
            model_name='comment',
            name='lesson',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='move4it.lesson', verbose_name='clase'),
        ),
        migrations.AddField(
            model_name='question',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='move4it.course', verbose_name='etapa'),
        ),
        migrations.AddField(
            model_name='questionalternative',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='move4it.question', verbose_name='pregunta'),
        ),
        migrations.AddField(
            model_name='resource',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='move4it.course', verbose_name='Etapa'),
        ),
        migrations.AddField(
            model_name='resource',
            name='lesson',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='move4it.lesson', verbose_name='Clase'),
        ),
        migrations.AddField(
            model_name='course',
            name='stage',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='move4it.stage', verbose_name='Etapa'),
        ),
        migrations.AddField(
            model_name='viewcontent',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='move4it.course', verbose_name='Etapa'),
        ),
        migrations.AddField(
            model_name='viewcontent',
            name='lesson',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='move4it.lesson', verbose_name='Clase'),
        ),
        migrations.AddField(
            model_name='viewcontent',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Estudiante'),
        ),
    ]
