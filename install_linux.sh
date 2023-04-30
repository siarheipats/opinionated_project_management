#/usr/bin/bash

# ubuntu installation steps
sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo apt install mysql-server
sudo systemctl start mysql.service

# final steps, installing nodejs app packages
cd frontend/
npm install
cd ../backend/
npm install