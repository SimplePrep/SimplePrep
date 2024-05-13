server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /vol/www/;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen      443 ssl;
    server_name ${DOMAIN} www.${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    include     /etc/nginx/options-ssl-nginx.conf;

    ssl_dhparam /vol/proxy/ssl-dhparams.pem;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location /static {
        alias /vol/static;
    }

    location /api {
        include /etc/nginx/uwsgi_params;
        uwsgi_pass ${APP_HOST}:${APP_PORT};  # This should be the only pass directive if using uWSGI
        client_max_body_size 10M;
    }
    location / {
        index index.html;
        root /home/ec2-user/SimplePrep/client-spa;
        try_files $uri $uri/ /index.html;
    }
}