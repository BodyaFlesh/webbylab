FROM node:14.8

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]