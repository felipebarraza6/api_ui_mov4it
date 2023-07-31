from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import action

from rest_framework import status
from rest_framework import mixins, viewsets, status


from rest_framework import generics

# Filters
from django_filters import rest_framework as filters

# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)


# Models
from api.learning.models import Stage, Course, Lesson, ViewContent, ApprovedCourse
# Serializers
from api.learning.serializers import (StageModelSerializer,
                                      RetrieveLessonModelSerializer,
                                      RetrieveCourseModelSerializer,
                                      CourseModelSerializer,
                                      LessonModelSerializer,
                                      ApprovedCourseModelSerializer,
                                      RetrieveApprovedCourseModelSerializer,
                                      ViewContentModelSerializer)


class StageViewSet(mixins.RetrieveModelMixin,
                   mixins.CreateModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   mixins.DestroyModelMixin,
                   viewsets.GenericViewSet,):

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return StageModelSerializer
        else:
            return StageModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = Stage.objects.all().order_by('created')
    ordering = ('created',)
    lookup_field = 'id'


class CourseViewSet(mixins.RetrieveModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.ListModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet,):

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return RetrieveCourseModelSerializer
        else:
            return CourseModelSerializer

    class CourseFilter(filters.FilterSet):
        class Meta:
            model = Course
            fields = {
                'stage': ['exact'],                
            }

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CourseFilter
    queryset = Course.objects.all().order_by('created')
    ordering = ('created',)
    lookup_field = 'id'


class LessonViewSet(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.ListModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet,):

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return RetrieveLessonModelSerializer
        else:
            return LessonModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = Lesson.objects.all()
    lookup_field = 'id'


class ApprovedCourseViewSet(mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.CreateModelMixin,
                            mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet,):

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return ApprovedCourseModelSerializer
        else:
            return ApprovedCourseModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = ApprovedCourse.objects.all()
    lookup_field = 'uuid'


class ViewContentViewSet(mixins.RetrieveModelMixin,
                         mixins.CreateModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.ListModelMixin,
                         mixins.DestroyModelMixin,
                         viewsets.GenericViewSet,):

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return ViewContentModelSerializer
        else:
            return ViewContentModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = ViewContent.objects.all()
    lookup_field = 'id'
