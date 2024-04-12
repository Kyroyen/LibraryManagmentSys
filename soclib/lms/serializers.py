from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import IntegerField, DateField
from rest_framework.exceptions import ErrorDetail, ValidationError
from django.utils import timezone
from django.conf import settings

from firebase_admin import credentials
from firebase_admin import auth
import firebase_admin
from firebase_admin.exceptions import FirebaseError
firebase_creds = credentials.Certificate(settings.FIREBASE_CONFIG)
firebase_admin = firebase_admin.initialize_app(firebase_creds)

from .models import Book, Genre, LibraryUser
from utils.days_to_price import days_to_price

class LibraryUserSerializer(ModelSerializer):

    class Meta:
        model = LibraryUser
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "fire_id",
        ]
        extra_kwargs = {
            "fire_id" : {
                "read_only" : True,
            },
        }
    
    def save(self, **kwargs):
        temp = super().save(**kwargs)
        try:
            user = auth.create_user(
                email = self.instance.email, # type: ignore
                email_verified = False,
                display_name = f"{self.instance.first_name} {self.instance.last_name}",# type: ignore
                uid = self.instance.fire_id,# type: ignore
            )
        except FirebaseError:
            raise ValidationError("Firebase Error")
        return temp
        


    


class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = ["name"]


class BookSerializer(ModelSerializer):
    # owned_by = LibraryUserSerializer(source = "current", read_only=True)
    genre = GenreSerializer(read_only=True)
    new_owner = LibraryUserSerializer(write_only=True)
    days_to_be_rented = IntegerField(write_only=True)

    class Meta:
        model = Book
        fields = [
            "name",
            "genre",
            "author",
            "avaliable",
            "next_avaliable",
            # "owned_by",
            "unique_id",
            "new_owner",
            "overdue",
            "days_to_be_rented",
        ]

        extra_kwargs = {
            "new_owner": {
                "write_only": True,
                "required": True,
            },
            "days_to_be_rented": {
                "write_only": True,
            }
        }

    def validate_days_to_be_rented(self, value):
        # print(value)
        if not isinstance(value, int):
            raise ValidationError("Days to be rented must be an integer")
        return value > 3

    def is_valid(self, *, raise_exception=False):
        # print(self.initial_data)
        return super().is_valid(raise_exception=raise_exception)


class BookRateSerializer(ModelSerializer):
    days_to_be_rented = IntegerField(write_only=True)
    price = IntegerField(read_only=True)
    return_date = DateField(read_only=True)

    class Meta:
        model = Book
        fields = [
            'price',
            "days_to_be_rented",
            "return_date",
        ]
        extra_kwargs = {
            "days_to_be_rented": {
                "write_only": True,
            },
        }

    def validate_days_to_be_rented(self, value):
        # print(value)
        if not isinstance(value, int):
            raise ValidationError("Days to be rented must be an integer")
        self.total_days = value
        return value > 3

    def is_valid(self, *, raise_exception=False):
        # print("initial", self.initial_data)
        is_avaliable_now = self.instance.__getattribute__(
            "avaliable") if self.instance else False
        # print("is_avaliable", is_avaliable_now)
        return super().is_valid(raise_exception=raise_exception) and (is_avaliable_now)

    def to_representation(self, instance):
        # print("instance", instance)
        # print("self", self)
        # print("self", self._data)
        data = {
            "return_date": (timezone.now() + timezone.timedelta(days=self.total_days)).date(),
            "price": days_to_price(self.total_days),
        }
        return data
