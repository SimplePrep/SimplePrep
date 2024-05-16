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

server {
    listen      443 ssl;
    server_name ${DOMAIN} www.${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include     /etc/nginx/options-ssl-nginx.conf;
    ssl_dhparam /vol/proxy/ssl-dhparams.pem;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    client_max_body_size 20M;

    location / {
        root /vol/web/frontend;
        try_files $uri $uri/ /index.html;
    }
}