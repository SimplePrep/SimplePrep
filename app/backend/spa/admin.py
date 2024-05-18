from django_otp.admin import OTPAdminSite
from django_otp.plugins.otp_totp.models import TOTPDevice
from django_otp.plugins.otp_totp.admin import TOTPDeviceAdmin


User = get_user_model()
class OTPAdmin(OTPAdminSite):
    pass 

admin_site = OTPAdmin(name='OTPAdmin')
admin_site.register(TOTPDevice, TOTPDeviceAdmin)