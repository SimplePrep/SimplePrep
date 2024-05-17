FROM python:3.10-alpine3.16
LABEL maintainer="alijon30"
WORKDIR /app
ENV PYTHONUNBUFFERED 1


COPY ./backend/requirements.txt /tmp/requirements.txt
COPY ./backend/requirements.dev.txt /tmp/requirements.dev.txt

# Create a Python virtual environment in /py and install dependencies
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install gunicorn && \
    apk add --update --no-cache postgresql-client libffi-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev linux-headers && \
    /py/bin/pip install django-cors-headers cffi Pillow && \
    /py/bin/pip install django-two-factor-auth django-otp phonenumbers && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then \
        /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    rm -rf /tmp && \
    apk del .tmp-build-deps

ENV PATH="/py/bin:$PATH"
ENV PYTHONPATH="/backend:$PYTHONPATH"


ADD ./backend /app/backend
ADD ./docker /app/docker

RUN /py/bin/python /app/backend/manage.py collectstatic --noinput