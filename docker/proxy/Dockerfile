FROM nginx:1.23.0-alpine
LABEL maintainer="trysimpleprep.com"

# Copy Nginx configuration files
COPY ./nginx/* /etc/nginx/
COPY ./run.sh /run.sh

# Set environment variables (if needed)
ENV APP_HOST=backend
ENV APP_PORT=8000

# Install necessary packages
RUN apk add --no-cache openssl bash

# Make the run script executable
RUN chmod +x /run.sh 

# Define volumes for static and web files
VOLUME /vol/static
VOLUME /vol/www

# Start Nginx with the custom run script
CMD ["/run.sh"]
