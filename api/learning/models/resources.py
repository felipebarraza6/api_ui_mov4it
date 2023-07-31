from django.db import models
from api.utils.models import ModelApi
from .courses import Course, Lesson


class Resource(ModelApi):
    name = models.CharField(max_length=250, verbose_name='Nombre')
    file = models.FileField(upload_to='resources/', verbose_name='Archivo')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Etapa')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Clase')
    course_resource = models.BooleanField(default=False, verbose_name='Recurso etapa')
    lesson_resource = models.BooleanField(default=False, verbose_name='Recurso clase')

    class Meta:
        verbose_name = 'recurso'
        verbose_name_plural = 'recursos'

    def __str__(self):
        return self.name

