from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from api.users.models import User, Profile, ExtraData
from import_export.admin import ExportActionMixin


class UserAdm(ExportActionMixin, admin.ModelAdmin):
    list_display = (
        'username',
        'group_participation',
        'email',
        'first_name',
        'last_name',
        'identification_number'
    )
    search_fields = ('email', 'identification_number')
    list_filter = ('type_user',)
    ordering = ('-created',)

    def save_model(self, request, obj, form, change):
        if obj.password == "pbkdf2" + "*":
            obj.password = obj.password
        else:
            obj.set_password(obj.password)
        super().save_model(request, obj, form, change)


admin.site.register(User, UserAdm)
admin.site.register(Profile)
admin.site.register(ExtraData)
