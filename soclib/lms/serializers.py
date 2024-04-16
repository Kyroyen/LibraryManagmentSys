from rest_framework.fields import empty
from utils.days_to_price import days_to_price
from .models import Book, Genre, LibraryUser
from rest_framework.serializers import ModelSerializer, BaseSerializer
from rest_framework.serializers import IntegerField, DateField
from rest_framework.exceptions import ErrorDetail, ValidationError
from django.utils import timezone

from firebase_admin.exceptions import FirebaseError
from firebase_admin import auth


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
            "fire_id": {
                "read_only": True,
            },
        }

    def is_valid(self, *, raise_exception=False):
        # print(self.initial_data)
        return super().is_valid(raise_exception=raise_exception)

    def save(self, **kwargs):
        temp = super().save(**kwargs)
        # print(self.data, self.validated_data)

        try:
            user = auth.create_user(
                email=self.instance.email,  # type: ignore
                email_verified=False, 
                display_name=f"{self.instance.first_name} {self.instance.last_name}", # type: ignore
                uid=self.instance.fire_id,  # type: ignore
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

    class Meta:
        model = Book
        fields = [
            "name",
            "genre",
            "author",
            "avaliable",
            "next_avaliable",
            "book_image",
            "unique_id",
            "overdue",
        ]

    def is_valid(self, *, raise_exception=False):
        print("BookSerilaizer",self.initial_data)
        return super().is_valid(raise_exception=raise_exception)
    

class BookBuySerializer(BaseSerializer):
    price = IntegerField(read_only=True)
    return_date = DateField(read_only=True)

    def __init__(self, user:LibraryUser, book:Book, days_to_be_rented:int):
        self.days_to_be_rented = days_to_be_rented
        self.user = LibraryUserSerializer(instance=user,write_only = True, required = True)
        self.book = BookSerializer(instance=book,write_only = True, required = True)
        super().__init__()
    
    def run_validation(self, data):
        print(self.book.instance.avaliable)
        if not self.book.instance.avaliable:
            raise ValidationError({'error':"Book Not Avaliable"})
        if (not isinstance(self.days_to_be_rented, int)) or (not self.days_to_be_rented>2):
            raise ValidationError({"error":'Invalid number of days'})
        return data

    def is_valid(self, *, raise_exception=False):
        try:
            self._validated_data = self.run_validation(self.data)
        except Exception as e:
            print(e.args)
            self.error_messages = e.args
            if raise_exception: 
                raise e
            else:
                return False
        return True

    def update_owner(self):
        book = self.book.instance
        new_owner = self.user.instance
        dtbr = self.days_to_be_rented
        book.book_history.add(
            new_owner
            )
        book.avaliable = False
        book.current = new_owner
        book.next_avaliable = (timezone.now() + timezone.timedelta(days=dtbr)).date()

    def save(self):
        print(self.user, self.book, self.days_to_be_rented,sep="\n-------------------\n")
        self.update_owner()
        self.book.instance.save()
        return self.book


class BookReturnSerializer(BaseSerializer):

    def __init__(self, user:LibraryUser, book:Book):
        self.user = LibraryUserSerializer(instance=user,write_only = True, required = True)
        self.book = BookSerializer(instance=book,write_only = True, required = True)
        super().__init__()
    
    def run_validation(self, data):
        print(self.book.instance.avaliable)
        if self.book.instance.avaliable:
            raise ValidationError({'error':"Book is already there"})
        if self.book.instance.current!=self.user.instance:
            raise ValidationError({"error":'Ain\'t the same user'})
        return data

    def is_valid(self, *, raise_exception=False):
        try:
            self._validated_data = self.run_validation(self.data)
        except Exception as e:
            print(e.args)
            self.error_messages = e.args
            if raise_exception: 
                raise e
            else:
                return False
        return True

    def update_owner(self):
        book = self.book.instance
        new_owner = self.user.instance
        dtbr = self.days_to_be_rented
        book.book_history.add(
            new_owner
            )
        book.avaliable = False
        book.current = new_owner
        book.next_avaliable = (timezone.now() + timezone.timedelta(days=dtbr)).date()

    def save(self):
        print(self.user, self.book, self.days_to_be_rented,sep="\n-------------------\n")
        self.update_owner()
        self.book.instance.save()
        return self.book

class BookRateSerializer(ModelSerializer):
    days_to_be_rented = IntegerField(write_only = True, required = True)
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
                "required": True,
            },
        }

    def validate_days_to_be_rented(self, value):
        if not isinstance(value, int):
            raise ValidationError("Days to be rented must be an integer")
        if value<3:
            raise ValidationError("Days to be rented must be greater than 3")

        self.total_days = value
        return True

    def is_valid(self, *, raise_exception=False):
        try: assert ("days_to_be_rented" in self.initial_data)
        except AssertionError as e:
            raise ValidationError("days_to_be_rented should be included")
        is_avaliable_now = self.instance.__getattribute__(
            "avaliable") if self.instance else False
        superdec = super().is_valid(raise_exception=raise_exception)
        print("superdec", superdec)
        return superdec and (is_avaliable_now)

    def to_representation(self, instance):
        # print("instance", instance)
        # print("self", self)
        # print("self", self._data)
        buy_token = {
            "book_id": self.instance.__getattribute__("unique_id"),

        }
        data = {
            "return_date": (timezone.now() + timezone.timedelta(days=self.total_days)).date(),
            "price": days_to_price(self.total_days),
        }
        return data
