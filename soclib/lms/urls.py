from django.contrib import admin
from django.urls import path

from .views import BooksView, BookView, RateQuotes, RegisterUserView, UserView

urlpatterns = [
    path("", UserView.as_view(), name = "user-details"),
    path("register/", RegisterUserView.as_view(), name = "register-user"),
    path("books/", BooksView.as_view(), name="Books"),
    path("book/<uuid:book_id>/", BookView.as_view(), name="Book"),
    path("book/<uuid:book_id>/buy/", RateQuotes.as_view(), name="Book-price"),
]