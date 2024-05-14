#!/bin/sh

set -e

# Navigate to the root directory where manage.py is located
cd /spa

python manage.py collectstatic --noinput
python manage.py migrate

uwsgi --socket :9000 --workers 4 --master --enable-threads --module spa.wsgi:application
