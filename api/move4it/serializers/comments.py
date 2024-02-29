from rest_framework import serializers
from api.move4it.models import Comment, AnswerComment
from api.users.serializers import UserModelSerializer


class AnswerCommentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerComment
        fields = '__all__'


class RetrieveCommentModelSerializer(serializers.ModelSerializer):
    user = UserModelSerializer()
    answer_comment = serializers.SerializerMethodField('get_answer')

    def get_answer(self, comment):

        qs = AnswerComment.objects.filter(comment=comment).first()
        serializer = AnswerCommentModelSerializer(instance=qs, many=False)
        data = serializer.data
        return data

    class Meta:
        model = Comment
        fields = '__all__'


class CommentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
