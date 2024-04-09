from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import BookSerializer
from .models import Book

class BookView(APIView):
    
    def get(self, request):
        queryset = Book.objects.all()
        search = self.request.GET.get("search", default=None)
        if search:
            queryset = queryset.filter(name__icontains = search)
        serializer = BookSerializer(queryset, many = True)
        return Response(data = serializer.data)
    