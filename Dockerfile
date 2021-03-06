FROM node

WORKDIR /usr/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npx prisma generate
RUN npm run build