#!/bin/sh

set -e

echo "Debug Info: Starting script"
echo "Current working directory: $(pwd)"
echo "Listing contents of the current directory:"
ls -l

# Navigate to the root directory where manage.py is located
cd /spa

echo "Debug Info: After cd to /spa"
echo "Current working directory after cd: $(pwd)"
echo "Listing contents of /spa:"
ls -l /spa

echo "Listing contents of /spa/spa:"
ls -l /spa/spa

echo "Running collectstatic..."
python manage.py collectstatic --noinput || { echo 'Collectstatic failed' ; exit 1; }

echo "Running migrations..."
python manage.py migrate || { echo 'Migration failed' ; exit 1; }

echo "Running simple Python import test..."
python -c "import spa; print(spa)" || { echo 'Python import test failed' ; exit 1; }

echo "Starting uWSGI..."
uwsgi --socket :9000 --workers 4 --master --enable-threads --module spa.wsgi || { echo 'uWSGI failed' ; exit 1; }
