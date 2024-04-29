from rest_framework.response import Response
from django.urls import resolve
from django.shortcuts import get_object_or_404
from rest_framework.renderers import JSONRenderer
from django.conf import settings

from .models import LibraryUser
from firebase_admin import auth

from rest_framework.authentication import TokenAuthentication as BaseTokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CustomAuth(BaseTokenAuthentication):

    require_http_auth = not (settings.USE_DEFAULT_AUTH)

    def authenticate(self, request):
        # print(self.require_http_auth)
        if not self.require_http_auth:
            user = LibraryUser.objects.get(username = "nigga")
            # print(user)
            return (user, None)
        auth = request.META.get('HTTP_AUTHORIZATION').split()
        # print(auth)


        if len(auth) == 1:
            msg = ('Invalid token header. No credentials provided.')
            raise AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = ('Invalid token header. Token string should not contain spaces.')
            raise AuthenticationFailed(msg)
        
        secret_token = auth[1]

        try:
            # print(secret_token)
            decoded_token = auth.verify_id_token(
                        secret_token
                    )
            # print(ua)
        except UnicodeError:
            raise AuthenticationFailed('Unauthorized')
        # super().authenticate()
        return self.authenticate_credentials(decoded_token)

    def authenticate_credentials(self, decoded_token):
        firebase_user_id = decoded_token["user_id"]
        try:
            user = LibraryUser.objects.get(
                        fire_id=firebase_user_id)
        except:
            raise AuthenticationFailed('Firebase User Not found on Database')
        return (user, None)