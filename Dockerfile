FROM node:alpine
WORKDIR /usr/app/front
EXPOSE 5000
COPY ./ ./
RUN npm install
CMD ["npm", "start"]