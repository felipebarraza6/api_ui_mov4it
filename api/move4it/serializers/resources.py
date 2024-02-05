from rest_framework import serializers
from api.move4it.models import Resource


class ResourceModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'
