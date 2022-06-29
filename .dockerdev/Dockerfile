ARG RUBY_VERSION

FROM ruby:$RUBY_VERSION

ARG PG_VERSION
ARG NODE_VERSION
ARG NODE_VERSION_MAJOR
ARG YARN_VERSION

# Common dependencies
RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
  && echo 'deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main' $PG_VERSION > /etc/apt/sources.list.d/pgdg.list \
  && curl -o /tmp/nodejs.deb https://deb.nodesource.com/node_$NODE_VERSION_MAJOR.x/pool/main/n/nodejs/nodejs_$NODE_VERSION-1nodesource1_amd64.deb \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list \
  && apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
  build-essential \
  gnupg2 \
  less \
  git \
  libcurl4-openssl-dev \
  libpq-dev \
  wget \
  zip \
  zlib1g-dev \
  postgresql-client-$PG_MAJOR \
  nodejs \
  yarn=$YARN_VERSION-1 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# RUN npm install -g yarn@$YARN_VERSION

# Configure bundler
ENV LANG=C.UTF-8 \
  BUNDLE_JOBS=4 \
  BUNDLE_RETRY=3 \
  LANG="en_US.UTF-8" \
  LANGUAGE="en_US.UTF-8" \
  TZ="Europe/Minsk"

# Store Bundler settings in the project's root
ENV BUNDLE_APP_CONFIG=.bundle

# Upgrade RubyGems
RUN gem update --system

# Create a directory for the app code
RUN mkdir -p /app
WORKDIR /app

# Document that we're going to expose port 3000
EXPOSE 3000
# Use Bash as the default command
CMD ["/usr/bin/bash"]