from django.contrib import admin
from django.urls import path

from .views import BookView

urlpatterns = [
    path("books/", BookView.as_view(), name="Books")
]