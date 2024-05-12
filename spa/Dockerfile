FROM python:3.10-alpine3.16
LABEL maintainer="alijon30"

ENV PYTHONUNBUFFERED 1

# Copy the requirements files
COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt

# Set the working directory
WORKDIR /spa

# Install dependencies
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client libffi-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev zlib zlib-dev linux-headers && \
    /py/bin/pip install cffi && \
    /py/bin/pip install djangorestframework-simplejwt && \
    /py/bin/pip install Pillow && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then \
        /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    rm -rf /tmp && \
    apk del .tmp-build-deps

# Add a non-root user for running the application
RUN adduser --disabled-password --no-create-home django-user

# Switch to non-root user
USER django-user

# Expose port 8000 and define the default command
EXPOSE 8000
CMD ["uwsgi", "--socket", ":9000", "--workers", "4", "--master", "--enable-threads", "--module", "spa.wsgi"]
