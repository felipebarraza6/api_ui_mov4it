"""User Model."""

# Django
from django.db import models
from django.contrib.auth.models import AbstractUser

# Utils
from api.utils.models import ModelApi

class User(ModelApi, AbstractUser):

    email = models.EmailField(
        'email address',
        unique = True,
        error_messages={
            'unique': 'El usuario ya existe.'
        }
    )

    identification_number = models.CharField(max_length=80, verbose_name='Número de identificación(rut o pasaporte)')
    phone_number = models.CharField(verbose_name='Telefono', max_length=500, blank=True, null=True)

    PROFILES = [
        ('ADM', 'administrator'),
        ('ADC', 'admin_client'),
        ('CF', 'client'),
    ]

    type_user = models.CharField(max_length=3, verbose_name='Tipo de usuario', choices=PROFILES)

    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'identification_number', 'type_user']

    is_verified = models.BooleanField(
        verbose_name = 'vertificado',
        default = True,
        help_text = 'Se establece en verdadero cuando el usuario ha verificado su dirección de correo electrónico'
    )

    USERNAME_FIELD = 'email'
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['created']

    def __str__(self):
        return self.email

    def get_short_name(self):
        return self.username    
