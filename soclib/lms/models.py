from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin

# Create your models here.

class LibraryUser(AbstractUser, PermissionsMixin):
    pass

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

    name = models.CharField(max_length=100, null = True, unique= True)
    author = models.CharField(max_length=40, null=True)
    avaliable = models.BooleanField(default=True)
    next_avaliable = models.DateField(blank=True, null=True)

    current = models.ForeignKey(
        to = LibraryUser,
        on_delete = models.SET_NULL,
        related_name = "current_owner",
        null = True,
    )

    # def __repr__(self) -> str:
    #     return f"{self.name.__str__()} - {self.author.__str__()}"
    
    def __str__(self) -> str:
        return f"{self.name.__str__()} - {self.author.__str__()}"


