# settings_dev.py

from .settings import *

DEBUG = True

ALLOWED_HOSTS = ['*']  # Allow all hosts in development

# Use a different database for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.environ.get('DB_HOST', 'db'),
        'NAME': os.environ.get('POSTGRES_DB', 'dev_db'),
        'USER': os.environ.get('POSTGRES_USER', 'dev_user'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', 'dev_password'),
        'PORT': '5432',
    }
}

# Additional development-specific settings
INSTALLED_APPS += [
    'debug_toolbar',  # Django Debug Toolbar
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

# Other development-specific configurations...
