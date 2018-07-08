#!/bin/sh

# Increase the memory_limit
if [ ! -z "$PUBLIC_FOLDER" ]; then
 sed -ri -e 's!/usr/src/app/public!${PUBLIC_FOLDER}!g' /etc/nginx/sites-available/default.conf
fi

# Start supervisord and services
/usr/sbin/nginx

# Execute fluffy
# exec ./bin/fluffy
exec npm run server
