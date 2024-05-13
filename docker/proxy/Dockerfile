# Setup Nginx to serve the SPA
FROM nginx:1.23.0-alpine
LABEL maintainer="trysimpleprep.com"

COPY build /usr/share/nginx/html
# Copy Nginx configuration files
COPY docker/proxy/nginx/* /etc/nginx/
# Copy run script
COPY docker/proxy/run.sh /run.sh
# Copy built SPA files from build stage to Nginx public folder
# Install necessary packages
RUN apk add --no-cache openssl bash
RUN chmod +x /run.sh 

# Define volumes for static content
VOLUME /vol/static
VOLUME /vol/www

CMD ["/run.sh"]
