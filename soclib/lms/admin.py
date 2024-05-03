from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *
from .mail_sender import make_make_data, send_all_mails


@admin.register(LibraryUser)
class LibraryUserAdmin(admin.ModelAdmin):
    # fields = ["username","first_name","last_name","fire_id"]
    pass

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["name", "overdue", "current"]
    actions = ("reminder_email",)

    @admin.action(description="Send reminder emails")
    def reminder_email(modeladmin, request, queryset):
        all_mail_list = make_make_data(queryset.all())
        send_all_mails(all_mail_list)


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    pass

@admin.register(ReadingHistory)
class ReadingHistoryAdmin(admin.ModelAdmin):
    pass