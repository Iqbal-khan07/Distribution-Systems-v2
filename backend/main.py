"""main.py: all fundamental server logic"""

from os.path import join, dirname
from dotenv import load_dotenv
import requests
import os
import flask
import flask_sqlalchemy
import json
import sql_related


dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)
database_uri = os.environ['DATABASE_URL']

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app

@app.route('/')
def deploy_index():
    """launches index.html through flask"""
    return flask.render_template('index.html')

if __name__ == '__main__':
    # database bootstrap function
    # remove / comment out this line after running once to prevent data redundancy
    sql_related.Sys_user.bootstrap_populate(db)
    
    app.run(port = int(os.getenv("PORT", 8080)), host = os.getenv("IP", "0.0.0.0"))
