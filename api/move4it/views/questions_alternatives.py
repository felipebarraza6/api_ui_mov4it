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
from api.move4it.models import Question, QuestionAlternative
# Serializers
from api.move4it.serializers import RetrieveQuestionModelSerializer, QuestionModelSerializer, QuestionAlternativeModelSerializer


class QuestionViewSet(mixins.RetrieveModelMixin,
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
            return RetrieveQuestionModelSerializer
        else:
            return QuestionModelSerializer

    class QuestionFilter(filters.FilterSet):
        class Meta:
            model = Question
            fields = {
                'course': ['exact'],
            }

    filterset_class = QuestionFilter
    filter_backends = (filters.DjangoFilterBackend,)
    queryset = Question.objects.all()
    lookup_field = 'id'


class QuestionAlternativeViewSet(mixins.RetrieveModelMixin,
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
            return QuestionAlternativeModelSerializer
        else:
            return QuestionAlternativeModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = QuestionAlternative.objects.all()
    lookup_field = 'id'
