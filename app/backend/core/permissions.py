from rest_framework import permissions

class IsAuthenticatedWithFirebase(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)