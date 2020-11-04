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
0. https://github.com/Zoraiz-Naeem/Distribution-System-CS490/tree/master_backend

# Install Dependencies
0. path to the cloned repo using: cd cds_backend
1. npm install
2. npm install -g webpack
3. npm install --save-dev webpack
4. npm install socket.io-client --save

# Setup Postgresql Database
1. sudo service postgresql initdb
2. sudo service postgresql start
3. sudo -u postgres createuser --superuser $USER
4. sudo -u postgres createdb $USER
5. run the following command: psql
6. in the psql terminal, ensure that your new user exists with the command: \du (you should see an entry with the name of your username)
7. ensure that your new database exists with the command: \l (you should see an entry with the name of your username)
8. create a new user that python can log into postgresql with: create user { username here } superuser password '{ password here }'; 
    a) make sure to get rid of\ the {} in there, but not the '' for the password.
9. exit the postgresql terminal with this command: \q

# Setup Project to Run
1. create a file in directory ("cds_backend") named sql.env
2. put the following line in sql.env: DATABASE_URL='postgresql://{user}:{pass}@localhost/{dbname}'
    a) replace {user} with the username you created in "Setup Postgresql Database" part 8
    b) replace {pass} with the password you created in "Setup Postgresql Database" part 8
    c) replace {dbname} with your username
3. run the following command to open pg_hba.conf: sudo vim /var/lib/pgsql9/data/pg_hba.conf
4. type in the following within vim: :%s/ident/md5/g
5. press enter
6. now type the following into vim: :wq
7. press enter
8. run the following command: sudo service postgresql restart
9. make sure you are in the cloned repo directory ("cds_backend")
10. run the following command: python
11. In the python terminal, enter the following: from tables import db
12. In the python terminal, enter the following: db.create_all()
13. Exit the python terminal with the following command: quit()

# Run the Project
1. make sure you are in the cloned repo directory ("cds_backend")
2. Enter the following command: npm run watch
3. Open a new terminal
4. Enter the following command in the new terminal: python main.python
5. The webpage should be up and running, enjoy!
