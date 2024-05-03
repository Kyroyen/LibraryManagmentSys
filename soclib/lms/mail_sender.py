from django.core.mail import send_mass_mail
from django.conf import settings

from typing import List
from .models import Book

sender_email = settings.EMAIL_HOST_USER

def make_email_tuple(book_name:str, user_email:str, return_date):
    return (
        f"Returning book : {book_name}",
        f"Please return the {book_name} book you're supposed to be returning on {return_date}",
        sender_email,
        [user_email],
    )

def send_all_mails(mail_data, fail_policy = True):
    send_mass_mail(mail_data, fail_silently=fail_policy)

def make_make_data(books):
    mail_list = []
    for book in books:
        print(book.overdue, book.avaliable, book.name)
        if book.avaliable or (book.current is None):
            continue
        mail_list.append(make_email_tuple(book.name, book.current.email, book.next_avaliable))
    return tuple(mail_list)

    