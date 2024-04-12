from django.conf import settings
from rest_framework.response import Response
from django.urls import resolve
from django.shortcuts import get_object_or_404

from models import LibraryUser

from firebase_admin import credentials
from firebase_admin import auth
import firebase_admin
firebase_creds = credentials.Certificate(settings.FIREBASE_CONFIG)
firebase_admin = firebase_admin.initialize_app(firebase_creds)

class AuthenticationCookieMiddleware(object):
    def __init__(self, get_response) -> None:
        self.get_response = get_response

    def __call__(self, request, **kwargs):
        reg_url = resolve(request.path_info).url_name == "register-user"
        if not reg_url and 'HTTP_AUTHORIZATION' in request.META:
            bearer = (request.META.get("HTTP_AUTHORIZATION")).split(" ")[:-1]
            # new_user = (request.META.get("HTTP_NEW_USER", "False") == "True")

            try:
                decoded_token = auth.verify_id_token(
                    bearer
                )
                firebase_user_id = decoded_token["user_id"]
                request.user = get_object_or_404(LibraryUser, fire_id = firebase_user_id)
            except:
                response = Response(data={
                    'detail': 'Authentication Failed'}, status=401
                )
                return response

            response = self.get_response(request)

        elif reg_url:
            response = self.get_response(request)
        else:
            response = Response(data={
                    'detail': 'Authentication Failed'}, status=401
                )

        return response
        
