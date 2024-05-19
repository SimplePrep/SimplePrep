from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django_otp.plugins.otp_totp.models import TOTPDevice

class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')
        email = self.normalize_email(email)
        extra_fields.setdefault('subscription_type', User.SubscriptionType.FREEMIUM)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)
        if password and not extra_fields.get('firebase_uid'):
            user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        user = self.create_user(email, first_name, last_name, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    class SubscriptionType(models.TextChoices):
        FREEMIUM = 'free'
        PREMIUM = 'premium'

    firebase_uid = models.CharField(max_length=128, unique=True, null=True)
    email = models.EmailField(unique=True, max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    subscription_type = models.CharField(max_length=10, choices=SubscriptionType.choices, default=SubscriptionType.FREEMIUM)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"
    
    def set_password(self, raw_password):
        if not self.firebase_uid:
            super().set_password(raw_password)
    
    def is_verified(self):
        return TOTPDevice.objects.filter(user=self, confirmed=True).exists()

class TempUser(models.Model):
    firebase_uid = models.CharField(max_length=128, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

