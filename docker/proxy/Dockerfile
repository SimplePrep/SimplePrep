FROM node:13.12.0-alpine as build

WORKDIR /SimplePrep/client-spa
COPY ./client-spa/package.json ./
COPY ./client-spa/package-lock.json ./
RUN npm ci --silent
COPY ./client-spa/ ./
RUN npm run build


FROM nginx:1.23.0-alpine
LABEL maintainer="trysimpleprep.com"

COPY docker/proxy/nginx/* /etc/nginx/
COPY docker/proxy/run.sh /run.sh
COPY --from=build /SimplePrep/client-spa/build /usr/share/nginx/html
# ENV APP_HOST=backend
# ENV APP_PORT=9000

RUN apk add --no-cache openssl bash
RUN chmod +x /run.sh 

VOLUME /vol/static
VOLUME /vol/www

CMD ["/run.sh"]