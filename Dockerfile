FROM phusion/baseimage:0.9.18

RUN apt-get update && \
    apt-get install -y --no-install-recommends moreutils patch libfreetype6 libfontconfig && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set node version to install
ENV NODE_VERSION=v6.3.1

# Download dependencies
WORKDIR /tmp
# RUN apt-get install -y make gcc g++ python
RUN curl -sSLOk https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.gz

# Install node
RUN tar -xzf "node-${NODE_VERSION}-linux-x64.tar.gz" -C /usr/local --strip-components=1

# Cleanup
RUN rm -rf *
WORKDIR /

RUN \
    groupadd -g 1000 reactssr && \
    useradd -u 1000 -g 1000 reactssr && \
    mkdir -p /app && \
    chown reactssr: /app && \
    ulimit -SHc 0

ARG GIT_SHA
RUN mkdir /react-ssr-docker && cd /react-ssr-docker && curl -L https://s3-us-west-2.amazonaws.com/react-ssr-docker/deploy-$GIT_SHA.tar.gz | tar xz --strip-components=1

RUN chown -R reactssr:reactssr /react-ssr-docker

# Without this, app tries to write the cache to /react-ssr-docker, which the reactssr we run as can't.
ENV BABEL_CACHE_PATH /tmp/babel.json

COPY scripts/run.sh /sbin/entry-point

# install node dependencies for server
WORKDIR /react-ssr-docker
COPY scripts/install.sh .
RUN ./install.sh

EXPOSE 3000

# pass to `entry-point` script to set UID:GID and start react-ssr-docker
CMD ["/sbin/entry-point"]
