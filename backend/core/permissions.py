from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.views import APIView


class CreateOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method == "POST"


class EditOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method == "PUT"


class IsAuthAndSuperAdminOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS