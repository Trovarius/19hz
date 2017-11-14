#!/bin/bash
echo 'runing docker'
sudo docker run -it -v $1:/app -p 3000:3000 pitzcarraldo/alpine-node-mongo sh
