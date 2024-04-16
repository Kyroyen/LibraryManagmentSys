from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *
# Register your models here.

@admin.register(LibraryUser)
class LibraryUserAdmin(admin.ModelAdmin):
    # fields = ["username","first_name","last_name","fire_id"]
    pass

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    pass

@admin.register(ReadingHistory)
class ReadingHistoryAdmin(admin.ModelAdmin):
    pass