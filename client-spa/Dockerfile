FROM node:16-alpine

WORKDIR /client-spa/

COPY package*.json /client-spa/
RUN npm install --legacy-peer-deps

COPY . /client-spa/

CMD ["npm", "start"]