from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import BookSerializer, BookRateSerializer, LibraryUserSerializer, BookBuySerializer
from .models import Book, LibraryUser

class RegisterUserView(APIView):
    def post(self, request):
        serilaizer = LibraryUserSerializer(data = request.data)
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
        serializer = BookSerializer(LibraryUser.objects.get(username=username), many=True)

class BooksView(APIView):
    
    def get(self, request):
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
        data = request.data
        data.update({"new_owner":request.user})
        print(data)
        serialzer = BookSerializer(instance=book, data = data, partial = True)
        
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
            print(serializer.data)
            response = Response(
                data=serializer.data,
            )
        else:
            response = Response(data = serializer.errors, status=400)
        return response
    
    def post(self, request, book_id):
        try:
            book = Book.objects.get(unique_id = book_id)
        except Book.DoesNotExist:
            return Response(status=404)
        data = request.data
        print(data)
        data.update({"user" : request.user, "book": book})
        print("dat:",data)
        serializer = BookBuySerializer(**data)
        if serializer.is_valid():
            book_serializer = serializer.save()
            response = Response(data=book_serializer.data)
        else:
            response = Response(data=serializer.error_messages, status=400)
        return response