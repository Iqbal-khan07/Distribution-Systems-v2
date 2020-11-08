"""main.py: all fundamental server logic"""
from os.path import join, dirname
from dotenv import load_dotenv
import requests
import os
import flask
import flask_socketio
import flask_sqlalchemy
import json
import connexion


dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)
database_uri = os.environ['DATABASE_URL']

#Flask SQLAlchemy Setup
apps = flask.Flask(__name__)
apps.config['SQLALCHEMY_DATABASE_URI'] = database_uri
apps.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

#SocketIO Setup
socketio = flask_socketio.SocketIO(apps)
socketio.init_app(apps, cors_allowed_origins="*")


db = flask_sqlalchemy.SQLAlchemy(apps)

#Prevent Circular Dependency
import sql_related

#Connexion Initialization
app = connexion.App(__name__, specification_dir='./')

    
     
def db_bootstrap():
    try:
        db.session.query(sql_related.UserTable).all()
    except:
        print("Error in Database")
        return
    users = db.session.query(sql_related.UserTable).all()
    dataCheck = [ db_name.username for db_name in users]
    
    
    if(dataCheck != []):
        print("Items exist in Database")
        return
    
    
    #Mock Data
    userRole = [1, 2, 3, 3, 2, 2]
    userName = ["John", "Adel", "Troy", "Mike", "Sam", "Orion"]
    userPass = ["black", "blue", "white", "purple", "indigo", "violet"]
    for userInsert in range(len(userRole)):
        db.session.add(sql_related.UserTable(userRole[userInsert], userName[userInsert], userPass[userInsert]))
        db.session.commit()
    users = db.session.query(sql_related.UserTable).all()
    
    #Check Whether Value in Database
    dataCheck = [ db_name.username for db_name in users]
    print(dataCheck)
    
def restEndpoint():
    #Create Connexion Application Instance
    global app
    app = connexion.App(__name__, specification_dir='./')
    
    # Read the swagger.yml file to configure the endpoints
    app.add_api('swagger.yml')
 
    
def init_db(app_i):
    """database initialization function"""
    db.init_app(app_i)
    db.app = app_i
    db.create_all() 
    db.session.commit()
    db_bootstrap()



@apps.route('/')
def deploy_index():
    """launches index.html through flask"""
    return flask.render_template('home.html')
    



if __name__ == '__main__':
    init_db(apps)
    restEndpoint()
    
    
    socketio.run \
    (
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug = True
    )
