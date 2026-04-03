ARG RUBY_VERSION=3.4.6
FROM ruby:$RUBY_VERSION-slim AS base

WORKDIR /app

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

ENV RACK_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# ビルドステージ
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential libpq-dev && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache

COPY . .

# 本番ステージ
FROM base

RUN groupadd --system --gid 1000 sinatra && \
    useradd sinatra --uid 1000 --gid 1000 --create-home --shell /bin/bash
USER 1000:1000

COPY --chown=sinatra:sinatra --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --chown=sinatra:sinatra --from=build /app /app

EXPOSE 3000
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
