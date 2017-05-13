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

RUN mkdir /react-ssr-docker && cd /react-ssr-docker && curl -L https://s3-us-west-2.amazonaws.com/react-ssr-docker/deploy-04cb9a4.tar.gz | tar xz --strip-components=1

RUN chown -R username:username /react-ssr-docker

# Without this, Kibana tries to write the cache to /kibana, which the username we run as can't.
ENV BABEL_CACHE_PATH /tmp/babel.json

COPY scripts/run.sh /sbin/entry-point

# pass to `entry-point` script to set UID:GID and start kibana
CMD ["/sbin/entry-point"]
