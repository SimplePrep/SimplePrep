FROM node:20-slim

WORKDIR /client-spa/

RUN apt-get update && apt-get install -y \
    make g++ \
    && rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

COPY package*.json /client-spa/

RUN node --max-old-space-size=4096 /usr/local/bin/npm install --legacy-peer-deps

COPY . /client-spa/

CMD ["npm", "start"]
