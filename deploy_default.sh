#!/bin/bash

# Скрипт выкладывает данные на сервак

LOGIN="insert login"
HOST="insert host"

ssh $LOGIN@$HOST 'bash -s' <<'ENDSSH'
  printf "Deleting events4frients data..."
  rm -rf /var/www/events4friends.ru/
  mkdir /var/www/events4friends.ru/
ENDSSH

scp -r index.html $LOGIN@$HOST:/var/www/events4friends.ru/
scp -r dist $LOGIN@$HOST:/var/www/events4friends.ru/
scp -r img $LOGIN@$HOST:/var/www/events4friends.ru/

printf "\nDONE!🍻\n\n"
