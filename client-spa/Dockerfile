FROM node:18-alpine

WORKDIR /client-spa/

# Install Python and build tools
RUN apk add --no-cache python3 py3-pip make g++ \
    && ln -sf python3 /usr/bin/python

# Set environment variable for Python
ENV PYTHON=/usr/bin/python

COPY package*.json /client-spa/

RUN npm install

COPY . /client-spa/

CMD ["npm", "start"]
