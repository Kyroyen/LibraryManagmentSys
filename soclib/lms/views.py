from rest_framework.views import APIView
from rest_framework.response import Response
from django.urls import resolve

from .serializers import BookSerializer, BookRateSerializer, LibraryUserSerializer
from .models import Book, LibraryUser

class RegisterUserView(APIView):
    def get(self, request):
        serilaizer = LibraryUserSerializer(data = request.data)
        if serilaizer.is_valid():
            serilaizer.save()
        return Response(serilaizer.data)

class UserView(APIView):

    def get(self, request):
        serializer = LibraryUserSerializer(LibraryUser.objects.get(username=request.data["username"]))
        return Response(serializer.data)

class BooksView(APIView):
    
    def get(self, request):
        # print(request.META["HTTP_NEW_USER"],type(request.META["HTTP_NEW_USER"]))
        # print(resolve(request.path_info).url_name)
        queryset = Book.objects.all()
        search = self.request.GET.get("search", default=None)
        avaliable  = self.request.GET.get('avaliable', default=None)
        if search is not None:
            queryset = queryset.filter(name__icontains = search)
        if avaliable is not None:
            queryset = queryset.filter(avaliable = avaliable)
        serializer = BookSerializer(queryset, many = True)
        return Response(data = serializer.data)

class BookView(APIView):

    def get(self, request, book_id):
        try:
            book = Book.objects.get(unique_id = book_id)
        except  Book.DoesNotExist:
            return Response(status=404)
        serializer = BookSerializer(book)
        return  Response(data = serializer.data)

    def patch(self, request, book_id):
        try:
            book = Book.objects.get(unique_id = book_id)
        except  Book.DoesNotExist:
            return Response(status=404)
        serialzer = BookSerializer(instance=book, data = request.data, partial = True)
        
        if serialzer.is_valid():
            print("True")
            print(serialzer.data)
        else:
            print(False)
        return Response()
    
class RateQuotes(APIView):

    def get(self, request, book_id):
        try:
            book = Book.objects.get(unique_id = book_id)
        except Book.DoesNotExist:
            return Response(status=404)
        serializer = BookRateSerializer(instance=book, data = request.data, partial = True)
        if serializer.is_valid():
            print(True)
        else:
            print(False)
        print(serializer.data)
        return Response()
        
