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
from api.learning.models import Comment, AnswerComment 
# Serializers
from api.learning.serializers import RetrieveCommentModelSerializer, CommentModelSerializer, AnswerCommentModelSerializer 


class CommentViewSet(mixins.RetrieveModelMixin, 
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
            return RetrieveCommentModelSerializer
        else:
            return CommentModelSerializer

    class CommentFilter(filters.FilterSet):
        class Meta:
            model = Comment
            fields = {
                'user': ['exact'],
                'course': ['exact'],
                'lesson': ['exact']
            }

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommentFilter
    queryset = Comment.objects.filter(is_approved=True)
    lookup_field = 'id'


class AnswerCommentViewSet(mixins.RetrieveModelMixin, 
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
            return AnswerCommentModelSerializer        
        else:
            return AnswerCommentModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = AnswerComment.objects.all()
    lookup_field = 'id'


