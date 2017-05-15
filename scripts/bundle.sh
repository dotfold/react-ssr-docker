#!/bin/bash
set -e

GIT_SHA=$(git rev-parse --short HEAD)
TAR_TARGET="deploy-$GIT_SHA.tar.gz"

mkdir -p deploy
tar -czvf deploy/deploy-$GIT_SHA.tar.gz dist/*
