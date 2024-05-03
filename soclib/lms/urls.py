from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import BooksView, BookView, RateQuotes, RegisterUserView, UserView, GenreView, BookGenreView, UserBooksView

urlpatterns = [
    path("", UserView.as_view(), name = "user-details"),
    path("owned/", UserBooksView.as_view(), name = "user-books"),
    path("register/", RegisterUserView.as_view(), name = "register-user"),
    path("books/", BooksView.as_view(), name="Books"),
    path("book/<uuid:book_id>/", BookView.as_view(), name="Book"),
    path("book/<uuid:book_id>/borrow-return/", RateQuotes.as_view(), name="Book-price"),
    path("genres/", GenreView.as_view(), name = "list-genre"),
    path("genre/<str:genre>/", BookGenreView.as_view(), name = "books-genre"),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]