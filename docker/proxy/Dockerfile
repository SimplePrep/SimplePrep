# Build stage for SPA
FROM node:13.12.0-alpine as build

WORKDIR /client-spa
COPY ./client-spa/package.json ./
COPY ./client-spa/package-lock.json ./
RUN npm ci --silent
COPY ./client-spa/ ./
RUN npm run build \
&& if [ $? -eq 0 ]; then \
        echo "Build successful"; \
    else \
        echo "Build failed"; \
        exit 1; \
    fi

# Setup Nginx to serve the SPA
FROM nginx:1.23.0-alpine
LABEL maintainer="trysimpleprep.com"

# Copy Nginx configuration files
COPY docker/proxy/nginx/* /etc/nginx/
# Copy run script
COPY docker/proxy/run.sh /run.sh
# Copy built SPA files from build stage to Nginx public folder
COPY --from=build /client-spa/build /usr/share/nginx/html

# Install necessary packages
RUN apk add --no-cache openssl bash
RUN chmod +x /run.sh 

# Define volumes for static content
VOLUME /vol/static
VOLUME /vol/www

CMD ["/run.sh"]
