#/usr/bin/bash

# Mac OS X installation steps
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
brew install node
brew install mysql
brew services start mysql

# final steps, installing nodejs app packages
cd frontend/
npm install
cd ../backend/
npm install