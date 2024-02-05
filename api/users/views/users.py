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
from api.users.models import User
# Serializers
from api.users.serializers import ResetPasswordSerializer, UserResponseSerializer, UserLoginSerializer, UserModelSerializer, UserSignUpSerializer
from api.move4it.models import ApprovedCourse, ViewContent
from api.move4it.serializers import RetrieveApprovedCourseModelSerializer


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet,):

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['login', 'signup']:
            permissions = [AllowAny]
        elif self.action in ['retrieve']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return UserResponseSerializer
        else:
            return UserModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = User.objects.filter(is_verified=True)
    serializer_class = UserModelSerializer
    lookup_field = 'username'

    @action(detail=False, methods=['post'])
    def reset_password(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
            'message': 'ACTUALIZADO'
        }
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def login(self, request):
        """User sign in."""
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()

        data = {
            'user': UserResponseSerializer(user).data,
            'access_token': token,

        }

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = UserSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserResponseSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        """Add extra data to the response."""
        response = super(UserViewSet, self).retrieve(request, *args, **kwargs)

        data_user_type = {}
        search_lessons_view = ViewContent.objects.filter(
            student=response.data['id']).values()
        search_approved_courses = ApprovedCourse.objects.filter(
            student=response.data['id'])
        serializer_approved = RetrieveApprovedCourseModelSerializer(
            search_approved_courses, many=True)
        data_approved = serializer_approved.data
        if (response.data['type_user'] == 'STU'):
            lessons = search_lessons_view

        data = {
            'user': response.data,
            'profile_data': {
                'course_approved': data_approved,
                'lessons_view': search_lessons_view
            }
        }

        response.data = data
        return response
