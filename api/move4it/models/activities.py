from django.db import models
from api.utils.models import ModelApi


class ActivityCategory(ModelApi):
    name = models.CharField(max_length=1200, verbose_name='nombre')
    description = models.TextField(
        max_length=1200, blank=True, null=True, verbose_name='descripcion')

    class Meta:
        verbose_name = 'Actividades - Categoria'
        verbose_name_plural = 'Actividades - Categorias'

    def __str__(self):
        return str(self.name)


class Activity(ModelApi):
    name = models.CharField(max_length=1200, verbose_name='nombre')
    category = models.ForeignKey(
        ActivityCategory, on_delete=models.CASCADE, verbose_name='categoria')

    class Meta:
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'

    def __str__(self):
        return str(self.name)
