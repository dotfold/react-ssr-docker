#!/bin/bash
GIT_SHA=$(git rev-parse --short HEAD)
docker build -t react-ssr-docker .
# docker tag react-ssr-docker:${GIT_SHA} react-ssr-docker:latest
# docker tag -f ${FULL_IMAGE_NAME}:${TAG_NAME} ${FULL_IMAGE_NAME}:latest
# docker tag 396984747102.dkr.ecr.us-west-2.amazonaws.com/react-ssr-docker:${GIT_SHA} 396984747102.dkr.ecr.us-west-2.amazonaws.com/react-ssr-docker:latest
docker tag react-ssr-docker:latest 396984747102.dkr.ecr.us-west-2.amazonaws.com/react-ssr-docker:latest
docker login -u "AWS" -p "$AWS_DOCKER_PASSWORD" -e none https://396984747102.dkr.ecr.us-west-2.amazonaws.com
docker push 396984747102.dkr.ecr.us-west-2.amazonaws.com/react-ssr-docker:latest
