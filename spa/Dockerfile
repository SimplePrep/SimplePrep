FROM python:3.9-alpine3.18
LABEL maintainer="alijon30"

ENV PYTHONUNBUFFERED 1

# Copy the requirements.txt file to /tmp/requirements.txt in the container
COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
# Copy the Django project code to the /spa directory in the container

# Expose port 8000 for the Django application
EXPOSE 8000

ARG DEV=false
# Create a Python virtual environment in /py and install dependencies
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client libffi-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev && \
    /py/bin/pip install django-cors-headers cffi Pillow && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then \
        /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    rm -rf /tmp && \
    apk del .tmp-build-deps

# Add the virtual environment's bin directory to the PATH
ENV PATH="/py/bin:$PATH"
COPY ./spa /spa
WORKDIR /spa

COPY ./spa/scripts/run.sh /spa/scripts/run.sh
RUN chmod +x /spa/scripts/run.sh
# Prepare volume directory
RUN mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    adduser --disabled-password --no-create-home django-user && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol


# Switch to non-root user for better security
USER django-user

# Expose port 8000 and define the default command
EXPOSE 8000
CMD ["uwsgi", "--socket", ":9000", "--workers", "4", "--master", "--enable-threads", "--module", "spa.wsgi"]
