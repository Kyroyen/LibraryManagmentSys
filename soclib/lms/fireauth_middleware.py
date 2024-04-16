from rest_framework.response import Response
from django.urls import resolve
from django.shortcuts import get_object_or_404
from rest_framework.renderers import JSONRenderer
from django.conf import settings

from .models import LibraryUser
from firebase_admin import auth


class AuthenticationCookieMiddleware(object):
    def __init__(self, get_response) -> None:
        self.get_response = get_response

    def __call__(self, request, **kwargs):
        reg_url = resolve(request.path_info).url_name == "register-user"
        # print(resolve(request.path_info).namespace)
        admin_url = resolve(request.path_info).namespace == "admin"
        has_http_auth = ('HTTP_AUTHORIZATION' in request.META) or (
            settings.USE_DEFAULT_AUTH)
        require_http_auth = not (settings.USE_DEFAULT_AUTH)
        if (not reg_url) and (has_http_auth) and (not admin_url):
            print(request.META.get("HTTP_AUTHORIZATION"))

            try:
                if require_http_auth:
                    bearer = (request.META.get("HTTP_AUTHORIZATION")).split(" ")[-1]
                    print(bearer)
                    decoded_token = auth.verify_id_token(
                        bearer
                    )

                    firebase_user_id = decoded_token["user_id"]
                    print(firebase_user_id)
                request.user = get_object_or_404(
                    LibraryUser,
                    fire_id=firebase_user_id,
                    # username="nigga"
                ) if require_http_auth else get_object_or_404(
                    LibraryUser,
                    # fire_id=firebase_user_id,
                    username="nigga"
                ) 
                print(request.user)
                response = self.get_response(request)
            except Exception as e:
                # print(e.args)
                response = Response(data={
                    'detail': 'Authentication Failed'}, status=401
                )

                response.accepted_renderer = JSONRenderer()
                response.accepted_media_type = "application/json"
                response.renderer_context = {}
                response.render()
                return response

            return response

        elif reg_url:
            response = self.get_response(request)
        elif admin_url:
            response = self.get_response(request)
        else:
            response = Response(data={
                'detail': 'BAD REQUEST'}, status=401
            )
            # print("HERE")
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            response.render()

        return response
