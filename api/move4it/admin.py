from api.move4it.models import Blog, Enterprise, Group, Activity, ActivityCategory
from import_export.admin import ExportActionMixin
from django.contrib import admin


admin.site.register(Blog)


@admin.register(Enterprise)
class EnterpriseAdmin(ExportActionMixin, admin.ModelAdmin):

    def get_equipment_count(self, obj):
        return obj.group_set.count()

    get_equipment_count.short_description = 'Cantidad de Equipos'

    def get_user_count(self, obj):
        groups = obj.group_set.all()
        user_count = sum(group.user_set.count() for group in groups)
        return user_count

    get_user_count.short_description = 'Participantes'

    list_display = ('name', 'email', 'phone', 'address',
                    'get_equipment_count', 'get_user_count')


@admin.register(Group)
class GroupAdmin(ExportActionMixin, admin.ModelAdmin):

    def get_equipment_count(self, obj):
        return obj.user_set.count()

    def get_leader_name(self, obj):
        leader = obj.user_set.filter(is_leader=True).first()
        if leader:
            return f"{leader.first_name} {leader.last_name} / {leader.email}"
        return None

    get_equipment_count.short_description = 'Participantes'
    get_leader_name.short_description = 'Líder de Grupo'

    list_display = ('name', 'enterprise',
                    'get_equipment_count', 'get_leader_name')


@admin.register(Activity)
class ActivityAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ('name', 'category')


@admin.register(ActivityCategory)
class ActivityCategoryAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ('name', 'description')
