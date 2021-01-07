FROM node:10.19.0

WORKDIR /graphql-api

COPY package*.json /graphql-api/

RUN npm install

COPY . /graphql-api

CMD node app

EXPOSE 4000