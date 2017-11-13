FROM node:alpine

RUN \
apk add --no-cache mongodb && \
rm /usr/bin/mongoperf

EXPOSE 27017 28017

COPY mongo.sh /root
ENTRYPOINT [ "/root/mongo.sh" ]
CMD [ "mongod" ]
