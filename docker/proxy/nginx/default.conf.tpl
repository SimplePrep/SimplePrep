server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location /test {
        return 200 "Domain is ${DOMAIN}";
    }

    location /.well-known/acme-challenge/ {
        root /vol/www/;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}