FROM python:3.10-alpine3.16
LABEL maintainer="alijon30"

ENV PYTHONUNBUFFERED 1

# Copy the requirements.txt file to /tmp/requirements.txt in the container
COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt

# Create a Python virtual environment in /py and install dependencies
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install gunicorn && \
    apk add --update --no-cache postgresql-client libffi-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev linux-headers && \
    /py/bin/pip install django-cors-headers cffi Pillow && \
    /py/bin/pip install django-otp qrcode && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then \
        /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    rm -rf /tmp && \
    apk del .tmp-build-deps

# Add the virtual environment's bin directory to the PATH
ENV PATH="/py/bin:$PATH"
ENV PYTHONPATH="/backend:$PYTHONPATH"

# Create the django-user before setting permissions
RUN adduser --disabled-password --no-create-home django-user

# Copy the Django project code to the /backend directory in the container
COPY . /backend
WORKDIR /backend

# Copy and set permissions for the run.sh script
RUN chmod +x /backend/scripts/run.sh

# Create the django_static directory and set permissions
RUN mkdir -p /backend/django_static && \
    chown -R django-user:django-user /backend/django_static && \
    chmod -R 755 /backend/django_static

# Prepare volume directory
RUN mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol

# Set permissions for migrations directory
RUN chown -R django-user:django-user /backend/core/migrations && \
    chmod -R 755 /backend/core/migrations

# Switch to non-root user for better security
USER django-user

# Expose port 8000 and define the default command
EXPOSE 8000
ENTRYPOINT ["/backend/scripts/run.sh"]
