"""
main.py: all fundamental server logic
"""


import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask_cors import CORS
import flask
import flask_sqlalchemy
import connexion
import sql_tables


DOTENV_PATH = join(dirname(__file__), "sql.env")
load_dotenv(DOTENV_PATH)
DATABASE_URI = os.environ["DATABASE_URL"]

APP_FLASK = flask.Flask(__name__)
APP_FLASK.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
APP_FLASK.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

APP_CONNEXION = connexion.App(__name__, specification_dir="./")

DB = flask_sqlalchemy.SQLAlchemy(APP_FLASK)
DB.init_app(APP_FLASK)
DB.app = APP_FLASK


def db_bootstrap():
    """
    Auto populates the database at DATABASE_URI with
    sql_tables.database_bootstrap if the database is empty
    """

    try:
        DB.session.query(sql_tables.Sys_user).all()
    except flask_sqlalchemy.sqlalchemy.orm.exc.NoResultFound:
        print("Database tables not found.")
        return

    users = DB.session.query(sql_tables.Sys_user).all()
    data_check = [db_name.name_first for db_name in users]

    if data_check == []:
        print("Database tables empty, populating.")
        sql_tables.database_bootstrap(DB)
        return


def endpoint_init():
    """
    Launches connexion to accept http connections on
    endpoints defined in swagger.yml
    """

    global APP_CONNEXION

    APP_CONNEXION = connexion.App(__name__, specification_dir="./")
    CORS(APP_CONNEXION.app)
    APP_CONNEXION.add_api("swagger.yml", validate_responses=True)


if __name__ == "__main__":
    db_bootstrap()
    endpoint_init()

    APP_CONNEXION.run(
        port=int(os.getenv("PORT", 8080)),
        host=os.getenv("IP", "0.0.0.0"),
        debug=False
    )
