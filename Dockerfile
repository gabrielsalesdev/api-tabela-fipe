FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm run build
COPY . .
EXPOSE 5472
CMD npm start