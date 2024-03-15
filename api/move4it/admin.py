from api.move4it.models import Blog, Enterprise, Group
from import_export.admin import ExportActionMixin
from django.contrib import admin


admin.site.register(Blog)


@admin.register(Enterprise)
class EnterpriseAdmin(ExportActionMixin, admin.ModelAdmin):

    def get_equipment_count(self, obj):
        return obj.group_set.count()

    get_equipment_count.short_description = 'Cantidad de Equipos'

    list_display = ('name', 'email', 'phone', 'address', 'get_equipment_count')


@admin.register(Group)
class GroupAdmin(ExportActionMixin, admin.ModelAdmin):

    def get_equipment_count(self, obj):
        return obj.user_set.count()

    get_equipment_count.short_description = 'Cantidad de Usuarios'

    list_display = ('name', 'enterprise', 'get_equipment_count')
