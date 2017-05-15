FROM phusion/baseimage:0.9.18

RUN apt-get update && \
    apt-get install -y --no-install-recommends moreutils patch libfreetype6 libfontconfig && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN \
    groupadd -g 1000 username && \
    useradd -u 1000 -g 1000 username && \
    mkdir -p /app && \
    chown username: /app && \
    ulimit -SHc 0

ARG GIT_SHA
RUN mkdir /react-ssr-docker && cd /react-ssr-docker && curl -L https://s3-us-west-2.amazonaws.com/react-ssr-docker/deploy-$GIT_SHA.tar.gz | tar xz --strip-components=1

RUN chown -R username:username /react-ssr-docker

# Without this, app tries to write the cache to /react-ssr-docker, which the username we run as can't.
ENV BABEL_CACHE_PATH /tmp/babel.json

COPY scripts/run.sh /sbin/entry-point
EXPOSE 3000 80

# pass to `entry-point` script to set UID:GID and start react-ssr-docker
CMD ["/sbin/entry-point"]
