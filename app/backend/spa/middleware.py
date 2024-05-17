from django.shortcuts import redirect
from django.urls import reverse
from django.utils.deprecation import MiddlewareMixin

class Admin2FAMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.user.is_authenticated and request.user.is_staff and not request.user.is_verified():
            if not request.path.startswith(reverse('two_factor:setup')):
                return redirect('two_factor:setup')
        return None