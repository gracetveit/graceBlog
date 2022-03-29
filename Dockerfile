FROM node

WORKDIR /usr/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build