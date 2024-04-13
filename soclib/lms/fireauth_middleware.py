from rest_framework.response import Response
from django.urls import resolve
from django.shortcuts import get_object_or_404
from rest_framework.renderers import JSONRenderer

from .models import LibraryUser
from firebase_admin import auth


class AuthenticationCookieMiddleware(object):
    def __init__(self, get_response) -> None:
        self.get_response = get_response

    def __call__(self, request, **kwargs):
        reg_url = resolve(request.path_info).url_name == "register-user"
        # print(resolve(request.path_info).namespace)
        admin_url = resolve(request.path_info).namespace == "admin"
        if not reg_url and 'HTTP_AUTHORIZATION' in request.META:
            print(request.META.get("HTTP_AUTHORIZATION"))
            bearer = (request.META.get("HTTP_AUTHORIZATION")).split(" ")[-1]
            # new_user = (request.META.get("HTTP_NEW_USER", "False") == "True")

            try:
                # print(bearer)
                decoded_token = auth.verify_id_token(
                    bearer
                )

                firebase_user_id = decoded_token["user_id"]
                # print(firebase_user_id)
                request.user = get_object_or_404(
                    LibraryUser, fire_id=firebase_user_id)
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
