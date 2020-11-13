import flask
import flask_sqlalchemy
from datetime import datetime
import backend_main
from pytz import timezone
import requests
import os
from backend_main import db, app_flask
from backend_main import sql_related
import sql_related
import json

# 3rd party modules
from flask import make_response, abort


def get_timestamp():
    tz = timezone('EST')
    return datetime.now(tz).strftime(("%Y-%m-%d %H:%M:%S"))

# Data to serve with our APIs
"""
try:
    db.session.query(sql_related.UserTable).all()
except:
    print("Error in Database")
    exit()
    
    -----------------------------------------> MAKE TRY BLOCK AFTER
"""    






"""
USER RELATED ENDPOINT FUNCTIONS

"""

# Create a handler for our  (POST) people
def user_authenticate_default(auth_user_default):
    """
    This function responds to a request for /api/people
    with the complete lists of people

    :return:        sorted list of people
    """
    return json.loads(sql_related.authenticate_default(db, auth_user_default))
    
def user_authenticate_gmail(auth_user_gmail):
    """
    
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    
    return json.loads(sql_related.authenticate_email(db, auth_user_gmail, True))
    
    """
    # Does the person exist already?
    if email not in USER and email is not None:
        
        db.session.commit()
        
        return make_response(
            "{email} successfully created".format(email=email), 201
        )

    # Otherwise, they exist, that's an error
    else:
        abort(
            406,
            "Person with last name {email} already exists".format(email=email),
        )
     
    """   
    
def user_authenticate_fb(auth_user_fb):
    """
    
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    
    return json.loads(sql_related.authenticate_email(db, auth_user_fb, False))
    
    """
    # Does the person exist already?
    if email not in USER and email is not None:
        
        db.session.commit()
        
        return make_response(
            "{email} successfully created".format(email=email), 201
        )

    # Otherwise, they exist, that's an error
    else:
        abort(
            406,
            "Person with last name {email} already exists".format(email=email),
        )
     
    """  

def get_company_product():
    """
    This function responds to a request for /api/people/{lname}
    with one matching person from people
    :param lname:   last name of person to find
    :return:        person matching last name
    """
    return json.loads(sql_related.request_company_product(db))
    
    # Does the person exist in people?
    """
    if user_email in USER:
        sys_user = USER.get(user_email)

    # otherwise, nope, not found
    else:
        abort(
            404, "Person with email {user_email} not found".format(user_email=user_email)
        )

    return sys_user
    """

"""
SHOP RELATED ENDPOINT FUNCITONS

"""

def get_order_not_delivered():
    # Create the list of people from our data name city street providence
    return json.loads(sql_related.request_shop_order_not_delivered(db))

# Create a handler for our read (GET) people
def get_all_shops():
    """
    This function responds to a request for /api/people
    with the complete lists of people

    :return:        sorted list of people
    """
    return json.loads(sql_related.request_shop(db))
    
def get_all_zones():
    """
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    return json.loads(sql_related.request_zone(db))
    
    """
    # Does the person exist already?
    if name not in SHOP and name is not None:
        
        db.session.add(sql_related.Shop(name, email, phone, category, street, city, providence, zip_4))
        db.session.commit()
        
        return make_response(
            "{name} successfully created".format(name=name), 201
        )

    # Otherwise, they exist, that's an error
    else:
        abort(
            406,
            "Shop with name {name} already exists".format(name=name),
        )
    """
        
def get_all_shop_category():
    """
    This function responds to a request for /api/people/{lname}
    with one matching person from people
    :param lname:   last name of person to find
    :return:        person matching last name
    """
    return json.loads(sql_related.request_shop_category(db))
    # Does the person exist in people?
    """
    if shop_name in SHOP:
        shop = SHOP.get(shop_name)

    # otherwise, nope, not found
    else:
        abort(
            404, "Shop with email {shop_name} not found".format(shop_name=shop_name)
        )

    return shop
    """



"""
COMPANY RELATED ENDPOINT FUNCTIONS  --> Finish Company

"""
    
def shop_create(new_shop):
    """
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    return json.loads(sql_related.create_shop(db, new_shop))
    
    """
    # Does the person exist already?
    if name not in COMPANY and name is not None:
        
        db.session.add(sql_related.Company(name))
        db.session.commit()
        
        return make_response(
            "{name} successfully created".format(name=name), 201
        )

    # Otherwise, they exist, that's an error
    else:
        abort(
            406,
            "Company with name {name} already exists".format(name=name),
        )
        
    """
 
def zone_create(new_zone):
    """
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    return json.loads(sql_related.create_zone(db, new_zone))
    
    """
    # Does the person exist already?
    if name not in COMPANY and name is not None:
        
        db.session.add(sql_related.Company(name))
        db.session.commit()
        
        return make_response(
            "{name} successfully created".format(name=name), 201
        )

    # Otherwise, they exist, that's an error
    else:
        abort(
            406,
            "Company with name {name} already exists".format(name=name),
        )
        
    """ 

def shop_category_create(new_shop_category):
    """
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    return json.loads(sql_related.create_shop_category(db, new_shop_category))
    
    """
    # Does the person exist already?
    if name not in COMPANY and name is not None:
        
        db.session.add(sql_related.Company(name))
        db.session.commit()
        
        return make_response(
            "{name} successfully created".format(name=name), 201
        )

    # Otherwise, they exist, that's an error
    else:
        abort(
            406,
            "Company with name {name} already exists".format(name=name),
        )
        
    """ 

def shop_order_create(new_shop_order):
    """
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    return json.loads(sql_related.create_shop_order(db, new_shop_order))
    
    """
    # Does the person exist already?
    if name not in COMPANY and name is not None:
        
        db.session.add(sql_related.Company(name))
        db.session.commit()
        
        return make_response(
            "{name} successfully created".format(name=name), 201
        )

    # Otherwise, they exist, that's an error
    else:
        abort(
            406,
            "Company with name {name} already exists".format(name=name),
        )
        
    """ 

def shop_order_update(update_shop_order):
    """
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    return json.loads(sql_related.update_shop_order_delivered(db, update_shop_order))
    
    """
    # Does the person exist already?
    if name not in COMPANY and name is not None:
        
        db.session.add(sql_related.Company(name))
        db.session.commit()
        
        return make_response(
            "{name} successfully created".format(name=name), 201
        )

    # Otherwise, they exist, that's an error
    else:
        abort(
            406,
            "Company with name {name} already exists".format(name=name),
        )
        
    """ 
 





"""
API KEY AUTHENTICATION

"""
    
def basic_auth(apiKey, required_scopes=None):
    print(apiKey)
    print(type(apiKey))
    if apiKey != '38873888119208341920489043128490384398138409834':
        abort(
                401, "Incorrect API Key Given"
            )
    return {}