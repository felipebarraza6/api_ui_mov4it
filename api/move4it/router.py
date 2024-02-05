from django.urls import include, path
from rest_framework.routers import DefaultRouter

# views
from api.move4it.views import courses as views_courses
from api.move4it.views import comments as views_comments
from api.move4it.views import questions_alternatives as views_questions
from api.move4it.views import resources as views_resources

from api.move4it.views import blogs as views_blogs

router = DefaultRouter()

router.register(r'stages', views_courses.StageViewSet, basename='stages')
router.register(r'courses', views_courses.CourseViewSet, basename='courses')
router.register(r'lessons', views_courses.LessonViewSet, basename='lessons')
router.register(r'approved_courses',
                views_courses.ApprovedCourseViewSet, basename='approved_courses')
router.register(r'view_contents',
                views_courses.ViewContentViewSet, basename='view_contents')
router.register(r'comments', views_comments.CommentViewSet,
                basename='comments')
router.register(r'answers', views_comments.AnswerCommentViewSet,
                basename='answers')
router.register(r'questions', views_questions.QuestionViewSet,
                basename='questions')
router.register(r'blogs', views_blogs.BlogViewSet, basename='blogs')

urlpatterns = [
    path('', include(router.urls))
]
