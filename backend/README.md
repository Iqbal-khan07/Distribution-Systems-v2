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
2. in the psql terminal, enter the following command: DROP TABLE IF EXISTS shop_order_item, shop_order, company_product, company_zone, company, shop_zone, shop, shop_category, zone, sys_user, sys_user_role;
2. Enter the following command: python backend_main.python
3. Now press control+c to stop the python file from running
4. comment out line 32 in backend_main.py "sql_related.database_bootstrap(db)"

# Run the Project
1. make sure you are in the "Distribution-System-CS490/backend" directory
2. Enter the following command: python backend_main.python
