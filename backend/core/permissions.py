from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class CreateOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method == "POST"