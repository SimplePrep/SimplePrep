FROM node:16-alpine

WORKDIR /client-spa/
RUN apk add --no-cache python3 make g++ \
    && ln -sf python3 /usr/bin/python
COPY package*.json /client-spa/
RUN npm install --legacy-peer-deps

COPY . /client-spa/

CMD ["npm", "start"]