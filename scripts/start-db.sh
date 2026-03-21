#!/bin/sh
docker compose up -d
until docker compose exec -T db pg_isready -q; do
  sleep 1
done
