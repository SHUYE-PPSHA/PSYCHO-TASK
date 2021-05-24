FROM node:alpine
WORKDIR /usr/app/front
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY ./ ./
CMD [ "npm", "start" ]