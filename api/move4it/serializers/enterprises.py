from rest_framework import serializers
from ..models import Enterprise, Group


class EnterpriseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enterprise
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    enterprise = serializers.SerializerMethodField('get_enterprise')

    def get_enterprise(self, group):
        enterprises = Enterprise.objects.filter(id=group.enterprise.id).first()
        return EnterpriseSerializer(enterprises, many=False).data

    class Meta:
        model = Group
        fields = '__all__'
