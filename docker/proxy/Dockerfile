FROM nginx:1.23.0-alpine
LABEL maintainer="trysimpleprep.com"

COPY ./nginx/* /etc/nginx/
COPY ./run.sh /run.sh

ENV APP_HOST=backend
ENV APP_PORT=8000

RUN apk add --no-cache openssl bash
RUN chmod +x /run.sh 

VOLUME /vol/web/static
VOLUME /vol/web/media
VOLUME /vol/www
VOLUME /vol/web/frontend

CMD ["/run.sh"]