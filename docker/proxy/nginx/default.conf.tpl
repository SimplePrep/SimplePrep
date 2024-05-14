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