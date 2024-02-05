from rest_framework import serializers
from api.move4it.models import Question, QuestionAlternative


class QuestionAlternativeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAlternative
        fields = '__all__'


class RetrieveQuestionModelSerializer(serializers.ModelSerializer):
    alternatives = serializers.SerializerMethodField('get_alternatives')

    def get_alternatives(self, question):
        qs = QuestionAlternative.objects.filter(question=question)
        serializer = QuestionAlternativeModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model = Question
        fields = '__all__'


class QuestionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
