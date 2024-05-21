#!/bin/sh

until cd /app/backend
do
    echo "Waiting for server volume..."
done

# Generate migrations
until ./manage.py makemigrations --noinput
do
    echo "Waiting for makemigrations to be ready..."
    sleep 2
done

# Apply migrations
until ./manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

# Collect static files
./manage.py collectstatic --noinput

# Start Gunicorn server
gunicorn spa.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4
