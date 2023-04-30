#/usr/bin/bash
export PATH="/usr/local/bin:$PATH"

# linux 
# ubuntu installation steps
sudo apt update
sudo apt install nodejs
sudo apt install npm

# final steps, installing nodejs app packages
cd frontend/
npm install
cd ../backend/
npm install