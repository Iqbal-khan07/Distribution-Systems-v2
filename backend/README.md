# In order to set up this project to run on your local machine, follow these steps in order:

# Update the Following:
1. sudo pip install --upgrade pip
2. sudo yum update

# Install the Following:
1. npm install 7
2. sudo pip install psycopg2-binary
3. sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs
4. sudo pip install -U python-dotenv
5. sudo pip install flask
6. sudo pip install flask-socketio
7. sudo pip install eventlet
8. sudo pip install Flask-SQLAlchemy==2.1
9. sudo pip install requests
10. sudo pip install -U flask-cors
11. sudo pip install connexion
12. sudo pip install connexion[swagger-ui]
 
# Clone this Repository 
0. https://github.com/Zoraiz-Naeem/Distribution-System-CS490/tree/backend-development

# Setup Postgresql Database
1. sudo service postgresql initdb
2. sudo service postgresql start
3. sudo -u postgres createuser --superuser $USER
4. sudo -u postgres createdb $USER
5. run the following command: psql
6. in the psql terminal, ensure that your new user exists with the command: \du (you should see an entry with the name of your username)
7. ensure that your new database exists with the command: \l (you should see an entry with the name of your username)
8. create a new user that python can log into postgresql with: create user { username here } superuser password '{ password here }'; 
    1. make sure to get rid of\ the {} in there, but not the '' for the password.
9. exit the postgresql terminal with this command: \q

# Setup Project to Run
1. create a file in directory "Distribution-System-CS490/backend" named sql.env
2. put the following line in sql.env: DATABASE_URL='postgresql://{user}:{pass}@localhost/{dbname}'
    1. replace {user} with the username you created in "Setup Postgresql Database" part 8
    2. replace {pass} with the password you created in "Setup Postgresql Database" part 8
    3. replace {dbname} with your username
3. run the following command to open pg_hba.conf: sudo vim /var/lib/pgsql9/data/pg_hba.conf
4. type in the following within vim: :%s/ident/md5/g
5. press enter
6. now type the following into vim: :wq
7. press enter
8. run the following command: sudo service postgresql restart
9. make sure you are in the "Distribution-System-CS490/backend" directory
10. run the following command: python
11. In the python terminal, enter the following: from sql_related import db
12. In the python terminal, enter the following: db.create_all()
13. Exit the python terminal with the following command: quit()

# Bootstrap the Database
1. If you already have previous versions of this projects database on your system or want to reset the database, do the following
    1. run the following command: psql
    2. in the psql terminal, enter the following command: DROP TABLE IF EXISTS order_taker_goal, shop_order_item, shop_order, company_product, company_zone, company, shop_zone, shop, shop_category, zone, sys_user, sys_user_role;
2. Enter the following command: python backend_main.python
3. Now press control+c to stop the python file from running
4. comment out line 34 in backend_main.py "sql_related.database_bootstrap(db)"

# Run the Project
1. make sure you are in the "Distribution-System-CS490/backend" directory
2. Enter the following command: python backend_main.python

# Project Database Information:
All database architecture information can be seen in the cds_backend_database_architecture.png file

# Project Endpoint Information:
All available HTTP request directories, request types, and JSON formatting can be seen in the cds_backend_endpoint.pdf file

# Notes About Unit Tests
Unit testing was only conducted on every function in sql_related.py as all actual functionality resides there. 

Backend_main.py and api.py functions are inherantly un-mockable / untestable as they set up exclusively the connexion 
and flask framework for the backend project to run on.

json_mock.py and html_request_test.py are files that are exlusively related to tesing HTTP request responses locally 
and on a Heroku deployment and as such have no need to have unit tests made for them as they are not a part of the main project.

# Work Done by Team Members

The team that made this project is composed of two members:
1. Tylor Autore
2. Abdul-Quddus Adeniji

# Work Done by Tylor Autore:
1. Created backend_main.py skeleton for database hosting
2. Designed relational database architecture and shared with all team members
3. Coded Database models in sql_related.py
4. Coded SQL bootstrap function in sql_related.py to populate a database with test data
5. Coded Basic database query functions to return data needed for frontend functions
6. Modified database query functions to work with mocked JSON passed from connexion HTTP interface
7. Designed REST endpoint naming and HTTP response JSON structures and shared with all team members
8. Pushed backend project to Heroku
9. Created unit tests for sql_related.py

# Work Done by Abdul:
1. Implemented and tested basic REST functionality for backend_main.py locally
2. Pushed test environment to Heroku to ensure that endpoint access from a remote environment works properly
3. Merged connexion endpoints with database query functions to serve frontend HTTP requests
4. Pushed backend project to Heroku
5. Linted all python files