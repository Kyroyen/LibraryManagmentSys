from django.contrib import admin

from .models import *
# Register your models here.

@admin.register(LibraryUser)
class LibraryUserAdmin(admin.ModelAdmin):
    pass

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    pass