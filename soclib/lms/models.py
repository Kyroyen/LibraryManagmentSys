from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils import timezone
import uuid

from utils.hex_uuid import get_uuid_hexed

class LibraryUser(AbstractUser, PermissionsMixin):
    fire_id = models.CharField(max_length=128, unique=True, default= get_uuid_hexed, editable=False)

class Genre(models.Model):
    name = models.CharField(max_length=20, null=True)

    def __str__(self) -> str:
        return self.name.__str__()

class Book(models.Model):
    genre = models.ForeignKey(
        to = Genre,
        on_delete = models.CASCADE,
        related_name = "genre",
        null = True,
    )

    unique_id = models.UUIDField(unique=True, default=uuid.uuid4)
    name = models.CharField(max_length=100, null = True, unique= True)
    author = models.CharField(max_length=40, null=True)
    avaliable = models.BooleanField(default=True)
    next_avaliable = models.DateField(blank=True, null=True)
    book_image = models.FileField(upload_to="book-images", blank=True)

    current = models.ForeignKey(
        to = LibraryUser,
        on_delete = models.SET_NULL,
        related_name = "current_owner",
        null = True,
    )

    @property
    def overdue(self):
        if (not self.avaliable) and timezone.now().date()>self.next_avaliable: # type: ignore
            return True
        return False
    
    def __str__(self) -> str:
        return f"{self.name.__str__()} - {self.author.__str__()}"


