FROM node:alpine

# set working directory
RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

# start app
CMD ["npm", "start"]
