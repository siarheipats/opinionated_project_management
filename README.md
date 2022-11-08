
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

The App is running now and listening on port 4000.

db.sql contains the queries for the db. Please update it as you continue developing the database.