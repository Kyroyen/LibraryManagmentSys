"""
WSGI config for soclib project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from django.conf import settings
from firebase_admin import credentials
import firebase_admin

firebase_creds = credentials.Certificate(settings.FIREBASE_CONFIG)
firebase_admin = firebase_admin.initialize_app(firebase_creds)

print("Firebase App initialized")

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'soclib.settings')

application = get_wsgi_application()
