FROM python:3.10-alpine3.16
LABEL maintainer="alijon30"

ENV PYTHONUNBUFFERED 1

# Copy the requirements.txt file to /tmp/requirements.txt in the container
COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
# Copy the Django project code to the /spa directory in the container


ARG DEV=false
# Create a Python virtual environment in /py and install dependencies
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client libffi-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev  zlib zlib-dev linux-headers && \
    /py/bin/pip install django-cors-headers cffi Pillow && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then \
        /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    rm -rf /tmp && \
    apk del .tmp-build-deps

# Add the virtual environment's bin directory to the PATH
ENV PATH="/scripts:/py/bin:$PATH"
COPY ./spa /spa
COPY ./scripts spa/scripts

WORKDIR /spa

RUN chmod +x /spa/scripts/run.sh
# Prepare volume directory
RUN mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    adduser --disabled-password --no-create-home django-user && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol && \
    chmod -R +x /scripts


# Switch to non-root user for better security
USER django-user

# Expose port 8000 and define the default command
EXPOSE 8000
CMD ["/spa/scripts/run.sh"]