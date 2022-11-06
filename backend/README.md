Make sure to create .env file and specify:
PORT=[4000]
DB_HOST=[localhost]
DB_USER=[root]
DB_PASSWORD=[your_password_to_MYSQL]
DB_DBNAME=[db_name]

Routes:

api/user/signup
RAW JSON
{
"email" : "[email]",
"phoneNumber": "[cellhpne]",
"firstName": "[firstName]",
"lastName": "[lastName]",
"password" : "[password]"
}
