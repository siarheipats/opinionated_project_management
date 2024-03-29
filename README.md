
## Steps for running backend

As a pre-requist to getting the backend running:
- Install mysql, and create a user 'db_user' with 'dbpassword'.
- Create 'dbname' database. as long as its similar to what is in the .env file.
 ```
 CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'dbpassword';
 CREATE DATABASE dbname;
 GRANT ALL ON *.* TO 'dbuser'@'localhost' WITH GRANT OPTION;
 ```


After installing nodejs/reactjs open the terminal and navigate to the backend directory. execute the commands:

``` 
$ cd opinionated_project_management/backend
$ npm install
$ npm start
```
then doing the same for the frontend, while leaving the backend running
``` 
$ cd opinionated_project_management/frontend
$ npm install
$ npm start
```

API requests can be seen in the window terminal where the backend is running, for example:
```
[~/opinionated_project_management/backend$] npm start

> backend@1.0.0 start
> node server.js

API is listening on 4000
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.
/ GET
/api/user/login POST
/api/user/login POST
Executing (default): SELECT `customerId`, `email`, `phoneNumber`, `firstName`, `lastName`, `password` FROM `Customers` AS `Customers` WHERE `Customers`.`email` = 'adam@people.net'
```
The App's backend is runs on port 4000 while the frontend is on port 3000.

db.sql contains the queries for the db. Please update it as you continue developing the database.


## Running the app under docker

for the purpose of development and testing the App could also be ran under docker. 

first make sure to install docker and docker-compose according to the official instructions here:
https://docs.docker.com/engine/install/

https://docs.docker.com/compose/install/

After finishing the installation of docker and docker-compose, the App can be ran using the following commands:

```
[~/opinionated_project_management/backend$] docker-compose up

```

it should take few minutes the first time, since it will installing nodejs and reactjs packages, if any errors occur afterwards, please make sure that ports 4000/3000 are not being used by other applications. to turn off the the app running under docker you can press ctrl+c inside the terminal.
