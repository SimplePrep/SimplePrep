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
        alias /home/ec2-user/SimplePrep/build; 
        expires 1y;
        add_header Cache-Control "public";
    }

    location /api {
        include /etc/nginx/uwsgi_params;
        uwsgi_pass ${APP_HOST}:${APP_PORT};
        client_max_body_size 10M;
    }
    location = / {
        root /home/ec2-user/SimplePrep/build;  
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    location = /favicon.ico {
        access_log off;
        log_not_found off;
        alias /home/ec2-user/SimplePrep/build/favicon.ico;
    }
}