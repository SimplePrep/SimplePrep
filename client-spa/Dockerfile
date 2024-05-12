FROM node:20-slim

WORKDIR /client-spa/
RUN apk add --no-cache python3 make g++ \
    && ln -sf python3 /usr/bin/python
COPY package*.json /client-spa/
# Set a higher memory limit for Node.js
RUN node --max-old-space-size=4096 /usr/local/bin/npm install --legacy-peer-deps


COPY . /client-spa/

CMD ["npm", "start"]