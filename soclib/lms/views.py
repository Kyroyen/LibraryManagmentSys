from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import BookSerializer, BookRateSerializer,\
      LibraryUserSerializer, BookBuySerializer, BookReturnSerializer, GenreSerializer
from .models import Book, LibraryUser, Genre


class RegisterUserView(APIView):
    def post(self, request):
        serilaizer = LibraryUserSerializer(data=request.data)
        if serilaizer.is_valid():
            serilaizer.save()
        return Response(serilaizer.data)


class UserView(APIView):

    def get(self, request):
        serializer = LibraryUserSerializer(request.user)
        return Response(serializer.data)


class UserBookView(APIView):

    def get(self, request):
        username = request.data.get('username')
        serializer = BookSerializer(
            LibraryUser.objects.get(username=username), many=True)


class BooksView(APIView):

    def get(self, request):
        queryset = Book.objects.all()
        search = self.request.GET.get("search", default=None)
        avaliable = self.request.GET.get('avaliable', default=None)
        if search is not None:
            queryset = queryset.filter(name__icontains=search)
        if avaliable is not None:
            queryset = queryset.filter(avaliable=avaliable)
        serializer = BookSerializer(queryset, many=True)
        return Response(data=serializer.data)

class UserBooksView(APIView):

    def get(self, request):
        serializer = BookSerializer(request.user.book_history.all(), many =True)
        return Response(data = serializer.data)

class BookView(APIView):

    def get(self, request, book_id):
        try:
            book = Book.objects.get(unique_id=book_id)
        except Book.DoesNotExist:
            return Response(status=404)
        serializer = BookSerializer(book)
        return Response(data=serializer.data)

    def patch(self, request, book_id):
        try:
            book = Book.objects.get(unique_id=book_id)
        except Book.DoesNotExist:
            return Response(status=404)
        data = request.data
        data.update({"new_owner": request.user})
        print(data)
        serialzer = BookSerializer(instance=book, data=data, partial=True)

        if serialzer.is_valid():
            print("True")
            print(serialzer.data)
        else:
            print(False)
        return Response()

class GenreView(APIView):

    def get(self, request):
        serializer = GenreSerializer(Genre.objects.all(), many = True)
        return Response(serializer.data, status=200)

class BookGenreView(APIView):

    def get(self, request, genre):
        serializer = BookSerializer(get_object_or_404(Genre, name=genre).genre.all(), many = True)
        return Response(data = serializer.data)


class RateQuotes(APIView):

    def get(self, request, book_id):
        try:
            book = Book.objects.get(unique_id=book_id)
        except Book.DoesNotExist:
            return Response(status=404)
        serializer = BookRateSerializer(
            instance=book, data=request.data, partial=True)
        if serializer.is_valid():
            print(serializer.data)
            response = Response(
                data=serializer.data,
            )
        else:
            response = Response(data=serializer.errors, status=400)
        return response

    def delete(self, request, book_id):
        try:
            book = Book.objects.get(unique_id=book_id)
        except Book.DoesNotExist:
            return Response(status=404)
        serializer = BookReturnSerializer(request.user, book)
        if serializer.is_valid():
            book_serializer = serializer.save()
            response = Response(data=book_serializer.data)
        else:
            response = Response(data=serializer.error_messages, status=400)
        return response

    def post(self, request, book_id):
        try:
            book = Book.objects.get(unique_id=book_id)
        except Book.DoesNotExist:
            return Response(status=404)
        data = request.data
        # print(data)
        data.update({"user": request.user, "book": book})
        # print("dat:", data)
        serializer = BookBuySerializer(**data)
        if serializer.is_valid():
            book_serializer = serializer.save()
            response = Response(data=book_serializer.data)
        else:
            response = Response(data=serializer.error_messages, status=400)
        return response
