from rest_framework.serializers import ModelSerializer

from .models import Book, Genre, LibraryUser

class LibraryUserSerializer(ModelSerializer):

    class Meta:
        model = LibraryUser
        fields = ["first_name"]
    
class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = ["name"]

class BookSerializer(ModelSerializer):
    owned_by = LibraryUserSerializer(source = "current", read_only=True)
    genre = GenreSerializer(read_only = True)
    new_owner = LibraryUserSerializer()
    class Meta:
        model = Book
        fields = [
            "name",
            "genre",
            "author",
            "avaliable",
            "next_avaliable",
            "owned_by",
            # "new_owner",
        ]
        extra_kwargs = {
            "new_owner": {
                "write_only": True,
            },
            "required" : True,
        }
    
    
    

    
