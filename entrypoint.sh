#!/bin/sh
set -e

echo "==> Running Prisma migrate deploy"
npx prisma migrate deploy --schema=prisma/schema.prisma

echo "==> Starting app"
exec node --enable-source-maps dist/server.js
