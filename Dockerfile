FROM node:14

WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
CMD cd ../frontend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
