from django.db import models
from api.utils.models import ModelApi
import uuid


class Stage(ModelApi):
    name = models.CharField(max_length=300, verbose_name='Nombre')
    description = models.TextField(max_length=1200, verbose_name='Descripcion')
    principal_image = models.ImageField(upload_to='courses/principal_images/', verbose_name='Imagen principal')
    prefix = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = 'etapa'
        verbose_name_plural = 'etapas'

    def __str__(self):
        return str(self.name)


class Course(ModelApi):
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE, verbose_name='Etapa')
    name = models.CharField(max_length=300, verbose_name='Nombre')
    title = models.CharField(max_length=300, blank=True, null=True, verbose_name='Titulo')
    code_travelcorfo = models.CharField(max_length=200, verbose_name='Codigo viaje del emprendedor', blank=True, null=True)
    description = models.TextField(max_length=1200, verbose_name='Descripcion')
    principal_image = models.ImageField(upload_to='courses/principal_images/', verbose_name='Imagen principal')
    expose = models.CharField(max_length=1200, blank=True, null=True, verbose_name='Expositor')
    correct_answers_to_pass = models.IntegerField(blank=True, null=True, verbose_name='Cantidad de preguntas correctas para aprobar')
    is_active = models.BooleanField(default=True, verbose_name='Etapa activa')

    class Meta: 
        verbose_name = 'curso'
        verbose_name_plural = 'cursos'

    def __str__(self):
        return str(self.name)

class GroupLessons(ModelApi):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Curso')
    title = models.CharField(max_length=300)

    def __str__(self):
        return str(self.title)
    

class Lesson(ModelApi):
    group = models.ForeignKey(GroupLessons, on_delete=models.CASCADE, verbose_name='Grupo')
    name = models.CharField(max_length=300, verbose_name='Nombre')
    description = models.TextField(max_length=1200, verbose_name='Descripcion')
    video_url = models.CharField(max_length=3000, verbose_name='ID youtube')
    is_active = models.BooleanField(default=True, verbose_name='Activo')
    minimum_time = models.DurationField(blank=True, null=True, verbose_name='Tiempo minimo en clase(segundos)')
    
    class Meta: 
        verbose_name = 'leccion'
        verbose_name_plural = 'lecciones'


    def __str__(self):
        return str(self.group)


class ApprovedCourse(ModelApi):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='Estudiante')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Etapa')
    calification = models.FloatField(verbose_name='Nota')
    code_generated_travelcorfo = models.CharField(max_length=300, verbose_name='Codigo generado para plataforma viaje del emprendedor')

    class Meta: 
        verbose_name = 'curso aprobado'
        verbose_name_plural = 'cursos aprobados'



    def __str__(self):
        return str(self.student)


class ViewContent(ModelApi):
    student = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='Estudiante')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Clase')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Etapa')
    is_lesson = models.BooleanField(default=True, verbose_name='Vista')
    
    class Meta:
        verbose_name = 'leccion vista'
        verbose_name_plural = 'lecciones vistas'

    def __str__(self):
        return str(self.student)

