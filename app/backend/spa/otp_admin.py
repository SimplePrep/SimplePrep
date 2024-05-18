from django.contrib import admin
from django_otp.admin import OTPAdminSite
from django_otp.plugins.otp_static.models import StaticRemoteUserData

class OTPAdmin(OTPAdminSite):
    remote_user_data = StaticRemoteUserData.objects.create(
        name='Google Authenticator',
    )

    # You can customize the OTP device name here
    otp_device_name = 'Admin 2FA'

otp_admin_site = OTPAdmin(name='OTPAdmin')