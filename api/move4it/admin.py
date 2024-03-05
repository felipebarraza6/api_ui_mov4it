from api.move4it.models import Blog, Enterprise, Group
from import_export.admin import ExportActionMixin
from django.contrib import admin


admin.site.register(Blog)
admin.site.register(Enterprise)
admin.site.register(Group)
