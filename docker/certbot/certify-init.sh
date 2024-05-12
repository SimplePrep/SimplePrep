#!/bin/sh

# Waits for proxy to be available, then gets the first certificate

set -e

echo "Starting the certificate acquisition process..."
echo "DOMAIN is set to: $DOMAIN"
echo "EMAIL is set to: $EMAIL"

until nc -z proxy 80; do 
    echo "Waiting for proxy..."
    sleep 5
done 

echo "Proxy is available. Proceeding with getting the certificate."

certbot certonly \
    --webroot \
    --webroot-path "/vol/www/" \
    -d "$DOMAIN" \
    --email $EMAIL \
    --rsa-key-size 4096 \
    --agree-tos \
    --noninteractive

echo "Certificate acquisition attempt complete."
