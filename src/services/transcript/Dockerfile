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

RUN apk add --update --no-cache \
  --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
  vips-dev fftw-dev gcc g++ make libc6-compat

RUN npm rebuild --build-from-source
#docker run -e GOOGLE_APPLICATION_CREDENTIALS=gcs_credentials.json transcript
