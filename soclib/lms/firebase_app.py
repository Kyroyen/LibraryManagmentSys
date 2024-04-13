from django.conf import settings
from firebase_admin import credentials
import firebase_admin

firebase_creds = credentials.Certificate(settings.FIREBASE_CONFIG)
firebase_admin = firebase_admin.initialize_app(firebase_creds)

print("Firebase App initialized")