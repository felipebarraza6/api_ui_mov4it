from django.db import models
from api.utils.models import ModelApi


class Enterprise(ModelApi):
    name = models.CharField(max_length=1200, verbose_name='nombre')
    description = models.TextField(
        max_length=1200, blank=True, null=True, verbose_name='descripcion')
    address = models.CharField(
        max_length=1200, blank=True, null=True, verbose_name='direccion')
    phone = models.CharField(max_length=1200, blank=True,
                             null=True, verbose_name='telefono')
    email = models.EmailField(
        max_length=1200, blank=True, null=True, verbose_name='correo')

    class Meta:
        verbose_name = 'Empresa'
        verbose_name_plural = 'Empresas'

    def __str__(self):
        return str(self.name)


class Group(ModelApi):
    name = models.CharField(max_length=1200, verbose_name='nombre')
    description = models.TextField(
        max_length=1200, blank=True, null=True, verbose_name='descripcion')
    enterprise = models.ForeignKey(
        Enterprise, on_delete=models.CASCADE, verbose_name='empresa')

    class Meta:
        verbose_name = 'Equipos'
        verbose_name_plural = 'Equipo'

    def __str__(self):
        return ('{} - {}').format(self.enterprise.name, self.name)
