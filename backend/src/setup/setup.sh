#!/bin/bash

#setup conf.env
touch conf.env 
echo "PORT=3000
MONGO_DB_URL=localhost
MONGO_DB=matcha" > conf.env
echo conf.env has been created!

#install npm packages
npm install
echo npm packages have been installed!

#connect to database
cd src/setup/
rm setup.js > /dev/null 2>&1
tsc setup.ts
sleep 5
node setup.js
rm setup.js