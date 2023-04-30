#/usr/bin/bash
export PATH="/usr/local/bin:$PATH"

# Mac OS X installation steps
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
brew install node

# final steps, installing nodejs app packages
cd frontend/
npm install
cd ../backend/
npm install