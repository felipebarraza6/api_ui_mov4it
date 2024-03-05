from django.urls import include, path
from rest_framework.routers import DefaultRouter
from api.move4it.views import blogs as views_blogs

router = DefaultRouter()

router.register(r'blogs', views_blogs.BlogViewSet, basename='blogs')

urlpatterns = [
    path('', include(router.urls))
]
