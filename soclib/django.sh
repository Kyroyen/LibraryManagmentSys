#!/bin/bash
echo "Apply database migrations"
python manage.py migrate

echo "collecting static"
python manage.py collectstatic

exec "$@"