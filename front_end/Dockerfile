FROM node:10.19.0

WORKDIR /front-end

COPY package*.json /front-end/

RUN npm install --global gatsby-cli
RUN npm install

COPY . /front-end

CMD ["gatsby", "develop", "-H", "0.0.0.0"]

EXPOSE 8000