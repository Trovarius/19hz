FROM node:alpine

# set working directory
RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm install nodemon -g

COPY . /app

# start app
CMD ["npm", "start"]
