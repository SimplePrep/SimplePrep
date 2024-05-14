server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        root /vol/www/build;
        try_files $uri $uri/ /index.html;
    }

    location /static {
        alias /vol/web/static/;
    }

    location /media {
        alias /vol/web/media/;
    }
}

server {
    listen 443 ssl;
    server_name ${DOMAIN} www.${DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/nginx/options-ssl-nginx.conf;
    ssl_dhparam /vol/proxy/ssl-dhparams.pem;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    client_max_body_size 20M;

    # Frontend
    location / {
        root /vol/www/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend
    #location /api/ {
    #  proxy_pass http://backend:8000;
    #   proxy_set_header Host $host;
    #}

    location /static {
        alias /vol/web/static/;
    }

    location /media {
        alias /vol/web/media/;
    }
}
