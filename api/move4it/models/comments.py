from django.db import models
from api.utils.models import ModelApi


class Comment(ModelApi):
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, verbose_name='usuario')
    comment = models.TextField(max_length=1200, verbose_name='comentario')
    course = models.ForeignKey(
        'move4it.Course', on_delete=models.CASCADE, blank=True, null=True, verbose_name='etapa')
    lesson = models.ForeignKey(
        'move4it.Lesson', on_delete=models.CASCADE, blank=True, null=True, verbose_name='clase')
    is_admin_comment = models.BooleanField(
        default=False, verbose_name='comentario de administrador')
    is_approved = models.BooleanField(
        default=False, verbose_name='comentario aprobado')

    class Meta:
        verbose_name = 'comentario'
        verbose_name_plural = 'comentarios'

    def __str__(self):
        return str(self.comment)


class AnswerComment(ModelApi):
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, verbose_name='usuario')
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, verbose_name='comentario')
    answer = models.TextField(max_length=1200, verbose_name='respuesta')

    class Meta:
        verbose_name = 'comentario - respuesta'
        verbose_name_plural = 'comentario - respuestas'

    def __str__(self):
        return str(self.user)
