import flask
import flask_sqlalchemy
from datetime import datetime
import main
from pytz import timezone
import requests
import os
from main import db, apps
from main import sql_related

# 3rd party modules
from flask import make_response, abort


def get_timestamp():
    tz = timezone('EST')
    return datetime.now(tz).strftime(("%Y-%m-%d %H:%M:%S"))

# Data to serve with our API s
"""
USER JSON FORMAT 
PEOPLE = {
    "Farrell": {
        "fname": "Doug",
        "lname": "Farrell",
        "timestamp": get_timestamp()
    },
    "Brockman": {
        "fname": "Kent",
        "lname": "Brockman",
        "timestamp": get_timestamp()
    },
    "Easter": {
        "fname": "Bunny",
        "lname": "Easter",
        "timestamp": get_timestamp()
    }
}
"""
try:
    db.session.query(sql_related.UserTable).all()
except:
    print("Error in Database")
    exit()
    

PEOPLE = {
}






def populate():
     # Create the list of people from our data
    users = db.session.query(sql_related.UserTable).all()
    dataUser = [ db_name.username for db_name in users]
    roles = [  db_name.role for db_name in users ]
    
    for userIndex in range(len(users)):
        username = dataUser[userIndex]
        role = roles[userIndex] 
        
        PEOPLE[username] = {
                "username": username,
                "role": role,
                "timestamp": get_timestamp(),
            }
    
    print([PEOPLE[key] for key in PEOPLE.keys()]) #--------------------------------------------------------------> Test Print





# Create a handler for our read (GET) people
def read():
    """
    This function responds to a request for /api/people
    with the complete lists of people

    :return:        sorted list of people
    """
    populate()
    return [PEOPLE[key] for key in PEOPLE.keys()]
    
def create(person):
    """
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    role = person.get("role", None)
    username = person.get("username", None)
    password = person.get("password", None)
    
    # Does the person exist already?
    if username not in PEOPLE and username is not None:
        
        db.session.add(sql_related.UserTable(role, username, password))
        db.session.commit()
        
        return make_response(
            "{username} successfully created".format(username=username), 201
        )

    # Otherwise, they exist, that's an error
    else:
        abort(
            406,
            "Person with last name {username} already exists".format(username=username),
        )
        
def read_one(username):
    """
    This function responds to a request for /api/people/{lname}
    with one matching person from people
    :param lname:   last name of person to find
    :return:        person matching last name
    """
    populate()
    # Does the person exist in people?
    if username in PEOPLE:
        person = PEOPLE.get(username)

    # otherwise, nope, not found
    else:
        abort(
            404, "Person with last name {username} not found".format(username=username)
        )

    return person
    
    
def basic_auth(apiKey, required_scopes=None):
    print(apiKey)
    print(type(apiKey))
    if apiKey != '38873888119208341920489043128490384398138409834':
        abort(
                401, "Incorrect API Key Given"
            )
    return {}