#!/bin/bash
set -e

echo "Postgres started, running migrations"
rm -f /app/tmp/pids/server.pid

bin/rails db:create
bin/rails db:migrate

# Execute the CMD from Dockerfile
exec "$@"
