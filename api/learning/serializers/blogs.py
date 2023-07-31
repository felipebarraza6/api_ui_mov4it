from rest_framework import serializers
from api.learning.models import Blog 


class BlogModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog        
        fields = '__all__'



