"""main.py: all fundamental server logic"""
from os.path import join, dirname
from dotenv import load_dotenv
import requests
import os
import flask
import flask_sqlalchemy
import json
import connexion
from flask_cors import CORS


dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)
database_uri = os.environ['DATABASE_URL']

#Flask SQLAlchemy Setup
apps = flask.Flask(__name__)
apps.config['SQLALCHEMY_DATABASE_URI'] = database_uri
apps.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


app = connexion.App(__name__, specification_dir='./')

db = flask_sqlalchemy.SQLAlchemy(apps)
db.init_app(apps)
db.app = apps

import sql_related


def db_bootstrap():
    try:
        db.session.query(sql_related.Sys_user).all()
    except:
        print("Error in Database")
        return
    users = db.session.query(sql_related.Sys_user).all()
    dataCheck = [ db_name.email for db_name in users]
    
    
    if(dataCheck != []):
        print("Items exist in Database")
        return
    sql_related.database_bootstrap(db)

def restEndpoint():
    #Create Connexion Application Instance
    global app
    app = connexion.App(__name__, specification_dir='./')
    CORS(app.app)
    # Read the swagger.yml file to configure the endpoints
    app.add_api('swagger.yml')
    
def init_db(app_i):
    """database initialization function"""
    db.init_app(app_i)
    db.app = app_i
    db.create_all() 
    db.session.commit()


@apps.route('/')
def deploy_index():
    """launches index.html through flask"""
    return flask.render_template('index.html')



if __name__ == '__main__':
    # database bootstrap function
    # remove / comment out this line after running once to prevent data redundancy
    init_db(apps)
    restEndpoint()
    db_bootstrap()
    
    app.run(port = int(os.getenv("PORT", 8080)), host = os.getenv("IP", "0.0.0.0"), debug = True)
    
    
