#!/bin/sh

# Wait until the /app/backend directory is available
until cd /app/backend
do
    echo "Waiting for server volume to be ready..."
    sleep 2
done

# Generate and apply database migrations
echo "Applying database migrations..."
/py/bin/python manage.py makemigrations --noinput || {
    echo "Error: Failed to create migrations."
    exit 1
}

/py/bin/python manage.py migrate --noinput || {
    echo "Error: Failed to apply migrations."
    exit 1
}

# Collect static files
echo "Collecting static files..."
/py/bin/python manage.py collectstatic --noinput || {
    echo "Error: Failed to collect static files."
    exit 1
}

# Start Gunicorn server
echo "Starting Gunicorn server..."
exec gunicorn spa.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --threads 4 \
    --log-level=info \
    --access-logfile=- \
    --error-logfile=-
