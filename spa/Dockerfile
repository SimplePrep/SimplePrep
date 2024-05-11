FROM python:3.9-alpine3.18
LABEL maintainer="alijon30"

ENV PYTHONUNBUFFERED 1

# Copy the requirements.txt file to /tmp/requirements.txt in the container
COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
# Copy the Django project code to the /spa directory in the container
COPY ./spa /spa

# Set the working directory to /spa
WORKDIR /spa

# Expose port 8000 for the Django application
EXPOSE 8000

ARG DEV=false
# Create a Python virtual environment in /py and install dependencies
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache libffi-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev && \
    /py/bin/pip install cffi  && \
    /py/bin/pip install djangorestframework-simplejwt && \
    /py/bin/pip install Pillow  && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ $DEV = "true" ];\
        then /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    rm -rf /tmp && \
    apk del .tmp-build-deps && \
    adduser \
        --disabled-password \
        --no-create-home \
        django-user

# Add the virtual environment's bin directory to the PATH
ENV PATH="/py/bin:$PATH"

# Set the user for running the application
USER django-user