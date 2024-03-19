from django.db import models

from .users import User
from api.utils.models import ModelApi


class Profile(ModelApi):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)


class CorporalMeditions(ModelApi):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    height = models.FloatField(verbose_name='Altura', blank=True, null=True)
    weight = models.FloatField(verbose_name='Peso', blank=True, null=True)
    fat = models.FloatField(verbose_name='Grasa', blank=True, null=True)

    class Meta:
        verbose_name = 'Medicion'
        verbose_name_plural = 'Mediciones'

    def __str__(self):
        return str(self.id)


class ExtraData(ModelApi):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)
