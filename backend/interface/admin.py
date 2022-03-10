from django.contrib import admin
from .models import Interface


class InterfaceAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')


admin.site.register(Interface, InterfaceAdmin)