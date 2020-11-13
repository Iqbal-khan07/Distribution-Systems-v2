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
import json_mock


dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)
database_uri = os.environ['DATABASE_URL']

#Flask SQLAlchemy Setup
app_flask = flask.Flask(__name__)
app_flask.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app_flask.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

app_connexion = connexion.App(__name__, specification_dir='./')

db = flask_sqlalchemy.SQLAlchemy(app_flask)
db.init_app(app_flask)
db.app = app_flask


# import sql_related here to prevent circular dependacies
import sql_related


def db_bootstrap():
    try:
        db.session.query(sql_related.Sys_user).all()
    except:
        print("Error in Database")
        return
    users = db.session.query(sql_related.Sys_user).all()
    dataCheck = [ db_name.name_first for db_name in users]
    
    
    if(dataCheck != []):
        print("Items exist in Database")
        return
    sql_related.database_bootstrap(db)

def restEndpoint():
    #Create Connexion Application Instance
    global app_connexion
    app_connexion = connexion.App(__name__, specification_dir='./')
    CORS(app_connexion.app)
    # Read the swagger.yml file to configure the endpoints
    app_connexion.add_api('swagger.yml')

if __name__ == '__main__':
    restEndpoint()
    app_connexion.run(port = int(os.getenv("PORT", 8080)), host = os.getenv("IP", "0.0.0.0"), debug = True)
