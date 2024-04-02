"""Urls Customers."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from api.users.views import users as views_users

router = DefaultRouter()

# Actions
router.register(r'users', views_users.UserViewSet, basename='users')
router.register(
    r'meditions', views_users.CorporalMeditionsViewSet, basename='meditions')

urlpatterns = [
    path('', include(router.urls))
]
