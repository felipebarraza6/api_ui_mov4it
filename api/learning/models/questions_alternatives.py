from django.db import models
from api.utils.models import ModelApi
from .courses import Course


class Question(ModelApi):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='etapa')
    question = models.CharField(max_length=1200, verbose_name='pregunta')

    class Meta:
        verbose_name = 'pregunta'
        verbose_name_plural = 'preguntas'

    def __str__(self):
        return str(self.question)

class QuestionAlternative(ModelApi):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name='pregunta')
    name = models.CharField(max_length=1200, verbose_name='nombre')
    is_correct = models.BooleanField(default=False, verbose_name='respuesta correcta')

    class Meta:
        verbose_name = 'pregunta - alternativa'
        verbose_name_plural = 'pregunta - alternativas'

    def __str__(self):
        return str(self.question)
    
