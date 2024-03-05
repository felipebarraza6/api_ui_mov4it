"""User Model."""

# Django
from django.db import models
from django.contrib.auth.models import AbstractUser

# Utils
from api.utils.models import ModelApi
from api.move4it.models import Group
import re


class User(ModelApi, AbstractUser):

    email = models.EmailField(
        'email address',
        unique=True,
        error_messages={
            'unique': 'El usuario ya existe.'
        }
    )

    identification_number = models.CharField(
        max_length=80, verbose_name='Número de identificación(rut o pasaporte)')
    phone_number = models.CharField(
        verbose_name='Telefono', max_length=500, blank=True, null=True)

    PROFILES = [
        ('ADM', 'administrator'),
        ('ADC', 'admin_client'),
        ('CF', 'client'),
    ]

    type_user = models.CharField(
        max_length=3, verbose_name='Tipo de usuario', choices=PROFILES)

    REQUIRED_FIELDS = ['first_name', 'last_name',
                       'identification_number', 'type_user']

    date_of_birth = models.DateField(
        verbose_name='Fecha de nacimiento', blank=True, null=True)
    bio = models.TextField(verbose_name='Biografía', blank=True, null=True)

    is_verified = models.BooleanField(
        verbose_name='vertificado',
        default=True,
        help_text='Se establece en verdadero cuando el usuario ha verificado su dirección de correo electrónico'
    )

    username = models.CharField(
        max_length=150,
        blank=True,
        null=True,
        unique=True,
        help_text='Deje este campo en blanco para generar automáticamente un nombre de usuario.'
    )

    USERNAME_FIELD = 'email'
    group_participation = models.ForeignKey(
        Group, on_delete=models.CASCADE, verbose_name='Grupo de participación', null=True, blank=True)

    def save(self, *args, **kwargs):
        self.username = f"{str(self.first_name).lower()}.{str(self.last_name).lower()}.{self.id}"
        self.username = re.sub(r'\.', '', self.username)
        self.username = re.sub(r'\W+', '', self.username)
        if len(self.identification_number) == 9:
            self.identification_number = f"{self.identification_number[:2]}.{self.identification_number[2:5]}.{self.identification_number[5:8]}-{self.identification_number[8]}"
        elif len(self.identification_number) == 10:
            self.identification_number = f"{self.identification_number[:2]}.{self.identification_number[2:5]}.{self.identification_number[5:8]}-{self.identification_number[8:]}"

        super(User, self).save(*args, **kwargs)
