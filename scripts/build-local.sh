#!/bin/bash
echo "start image build"
GIT_SHA=$(git rev-parse --short HEAD)
IMAGE_NAME="react-ssr-docker"

# Build and push
docker build -t $IMAGE_NAME . --build-arg GIT_SHA=$GIT_SHA
