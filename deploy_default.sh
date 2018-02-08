#!/bin/bash

# Скрипт выкладывает данные на сервак

LOGIN="insert login"
HOST="insert host"

scp -r ./dist $LOGIN@$HOST:/var/www/events4friends.ru.tmp
scp -r ./img $LOGIN@$HOST:/var/www/events4friends.ru.tmp
scp -r ./index.html $LOGIN@$HOST:/var/www/events4friends.ru.tmp

ssh $LOGIN@$HOST 'bash -s' <<'ENDSSH'
  # эти команды выполнятся на вашем удаленном сервере
  rm -rf /var/www/events4friends.ru
  mv /var/www/events4friends.ru.tmp /var/www/events4friends.ru
  printf "\nDONE!🍻\n\n"
ENDSSH
