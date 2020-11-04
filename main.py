"""main.py: all fundamental server logic"""

from os.path import join, dirname
from dotenv import load_dotenv
import requests
import os
import flask
import flask_socketio
import flask_sqlalchemy
import sql_related
import json


dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)
database_uri = os.environ['DATABASE_URL']

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

db = flask_sqlalchemy.SQLAlchemy()

def init_db(app_i):
    """database initialization function"""
    db.init_app(app_i)
    db.app = app_i
    db.create_all() 
    db.session.commit()
    # put database bootstrap function here

@app.route('/')
def deploy_index():
    """launches index.html through flask"""
    return flask.render_template('index.html')
    

if __name__ == '__main__':
    init_db(app)
    
    socketio.run \
    (
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080))
    )
