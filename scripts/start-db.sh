#!/bin/sh
MAX_RETRIES=30
docker compose up -d
i=0
until docker compose exec -T db pg_isready -q; do
  i=$((i + 1))
  if [ "$i" -ge "$MAX_RETRIES" ]; then
    echo "Postgres did not become ready after $MAX_RETRIES seconds" >&2
    exit 1
  fi
  sleep 1
done
