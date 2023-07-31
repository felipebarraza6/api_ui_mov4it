from rest_framework import serializers
from api.learning.models import Stage, Resource, Course, Lesson, GroupLessons, ApprovedCourse, ViewContent
from .resources import ResourceModelSerializer 

class StageModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = '__all__'


class CourseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class LessonModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class RetrieveLessonModelSerializer(serializers.ModelSerializer):
    resources = serializers.SerializerMethodField('get_resources')
    
    def get_resources(self, lesson):
        qs = Resource.objects.filter(lesson=lesson)
        serializer = ResourceModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data


    class Meta:
        model = Lesson
        fields = '__all__'

class GroupLessonsModelSerializer(serializers.ModelSerializer):
    lessons = serializers.SerializerMethodField('get_lessons')
 
    def get_lessons(self, group):
        qs = Lesson.objects.filter(group=group)
        serializer = RetrieveLessonModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model = GroupLessons
        fields = '__all__'


class RetrieveCourseModelSerializer(serializers.ModelSerializer):
    resources = serializers.SerializerMethodField('get_resources')
    groups = serializers.SerializerMethodField('get_groups')
    stage = StageModelSerializer()
 
    def get_groups(self, course):
        qs = GroupLessons.objects.filter(course=course)
        serializer = GroupLessonsModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    def get_resources(self, course):
        qs = Resource.objects.filter(course=course)
        serializer = ResourceModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data
    

    class Meta:
        model = Course
        fields = '__all__'


class RetrieveApprovedCourseModelSerializer(serializers.ModelSerializer):
    course = serializers.SerializerMethodField('get_course')
    
    def get_course(self, approved):
        qs = Course.objects.filter(id=approved.course_id).first()
        serializer = CourseModelSerializer(instance=qs, many=False)
        data = serializer.data
        return data

    class Meta: 
        model = ApprovedCourse
        fields = '__all__'



class ApprovedCourseModelSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ApprovedCourse
        fields = '__all__'


class ViewContentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewContent
        fields = '__all__'

