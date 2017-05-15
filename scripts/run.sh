#! /bin/sh
echo "running service!"
echo $(which node)
echo $(node -v)
exec node react-ssr-docker/server.js
