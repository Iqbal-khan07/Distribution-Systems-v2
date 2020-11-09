import flask
import flask_sqlalchemy
from datetime import datetime
import backend_main
from pytz import timezone
import requests
import os
from backend_main import db, apps
from backend_main import sql_related

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

try:
    db.session.query(sql_related.UserTable).all()
except:
    print("Error in Database")
    exit()
    
    -----------------------------------------> MAKE TRY BLOCK AFTER
"""    

USER = {}
SHOP = {}
COMPANY = {}






"""
USER RELATED ENDPOINT FUNCTIONS

self.name_first = nf
self.name_last = nl
self.email = em
self.password = pw
self.phone_number = pn
self.role = ro

"""

def user_populate():
     # Create the list of people from our data
    users = db.session.query(sql_related.Sys_user).all()
    userFirsts = [ db_first.name_first for db_first in users ]
    userLasts = [ db_last.name_last for db_last in users ]
    userEmails = [ db_email.email for db_email in users ]
    userNumbers = [ db_phone.phone_number for db_phone in users ]
    userRoles = [  db_role.role for db_role in users ]
    
    for userIndex in range(len(users)):
        first = userFirsts[userIndex]
        last = userLasts[userIndex]
        email = userEmails[userIndex]
        phone = userNumbers[userIndex]
        role = userRoles[userIndex]
        
        
        USER[email] = {
                "first": first,
                "last": last,
                "email": email,
                "number": phone,
                "role": role,
                "timestamp": get_timestamp(),
            }
    
    print([USER[key] for key in USER.keys()]) #--------------------------------------------------------------> Test Print





# Create a handler for our read (GET) people
def user_read():
    """
    This function responds to a request for /api/people
    with the complete lists of people

    :return:        sorted list of people
    """
    user_populate()
    return [USER[key] for key in USER.keys()]
    
def user_create(new_user):
    """
        self.name_first = nf
        self.name_last = nl
        self.email = em
        self.password = pw
        self.phone_number = pn
        self.role = ro
    
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    fName = new_user.get("first", None)
    lName = new_user.get("last", None)
    email = new_user.get("email", None)
    password = new_user.get("password", None)
    phone = new_user.get("number", None)
    role = new_user.get("role", None)
    
    
    user_populate()
    # Does the person exist already?
    if email not in USER and email is not None:
        
        db.session.add(sql_related.Sys_user(fName, lName, email, password, phone, role))
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
        
def user_read_one(user_email):
    """
    This function responds to a request for /api/people/{lname}
    with one matching person from people
    :param lname:   last name of person to find
    :return:        person matching last name
    """
    user_populate()
    # Does the person exist in people?
    if user_email in USER:
        sys_user = USER.get(user_email)

    # otherwise, nope, not found
    else:
        abort(
            404, "Person with email {user_email} not found".format(user_email=user_email)
        )

    return sys_user

"""
SHOP RELATED ENDPOINT FUNCITONS

self.name = na
self.email = em
self.phone_number = pn
self.category = cat
self.street = st
self.city = ci
self.providence = pr
self.zip_4 = zi

"""
def shop_populate():
     # Create the list of people from our data name city street providence
    shops = db.session.query(sql_related.Shop).all()
    shopNames = [ db_name.name for db_name in shops ]
    shopEmails = [ db_email.email for db_email in shops ]
    shopNumbers = [ db_phone.phone_number for db_phone in shops ]
    shopCatagories = [ db_category.category for db_category in shops ]
    shopStreets = [ db_street.street for db_street in shops ]
    shopCities = [  db_city.city for db_city in shops ]
    shopProvidences = [ db_providence.providence for db_providence in shops ]
    shopZips = [ db_zip.zip_4 for db_zip in shops ]
    
    for shopIndex in range(len(shops)):
        name = shopNames[shopIndex]
        email = shopEmails[shopIndex]
        number = shopNumbers[shopIndex]
        catagory = shopCatagories[shopIndex]
        street = shopStreets[shopIndex]
        city = shopCities[shopIndex]
        providence = shopProvidences[shopIndex]
        zip_4 = shopZips[shopIndex]
        
        SHOP[name] = {
                "name": name,
                "email": email,
                "number": number,
                "catagory": catagory,
                "street": street,
                "city": city,
                "providence": providence,
                "zip": zip_4,
                "timestamp": get_timestamp(),
            }
    
    print([SHOP[key] for key in SHOP.keys()]) #--------------------------------------------------------------> Test Print





# Create a handler for our read (GET) people
def shop_read():
    """
    This function responds to a request for /api/people
    with the complete lists of people

    :return:        sorted list of people
    """
    shop_populate()
    return [SHOP[key] for key in SHOP.keys()]
    
def shop_create(new_shop):
    """
    self.name = na
    self.email = em
    self.phone_number = pn
    self.category = cat
    self.street = st
    self.city = ci
    self.providence = pr
    self.zip_4 = zi
    
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    name = new_shop.get("name", None)
    email = new_shop.get("email", None)
    phone = new_shop.get("number", None)
    category = new_shop.get("category", None)
    street = new_shop.get("street", None)
    city = new_shop.get("city", None)
    providence = new_shop.get("providence", None)
    zip_4 = new_shop.get("zip", None)
    
    shop_populate()
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
        
def shop_read_one(shop_name):
    """
    This function responds to a request for /api/people/{lname}
    with one matching person from people
    :param lname:   last name of person to find
    :return:        person matching last name
    """
    shop_populate()
    # Does the person exist in people?
    if shop_name in SHOP:
        shop = SHOP.get(shop_name)

    # otherwise, nope, not found
    else:
        abort(
            404, "Shop with email {shop_name} not found".format(shop_name=shop_name)
        )

    return shop




"""
COMPANY RELATED ENDPOINT FUNCTIONS  --> Finish Company

"""

def company_populate():
     # Create the list of people from our data name city street providence
    companies = db.session.query(sql_related.Company).all()
    companyNames = [ db_name.name for db_name in companies ]
    
    for companyIndex in range(len(companies)):
        name = companyNames[companyIndex]
        
        
        COMPANY[name] = {
                "name": name,
                "timestamp": get_timestamp()
            }
    
    print([COMPANY[key] for key in COMPANY.keys()]) #--------------------------------------------------------------> Test Print





# Create a handler for our read (GET) people
def company_read():
    """
    This function responds to a request for /api/people
    with the complete lists of people

    :return:        sorted list of people
    """
    company_populate()
    return [COMPANY[key] for key in COMPANY.keys()]
    
def company_create(new_company):
    """
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    name = new_company.get("name", None)
    
    company_populate()
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
        
def company_read_one(company_name):
    """
    This function responds to a request for /api/people/{lname}
    with one matching person from people
    :param lname:   last name of person to find
    :return:        person matching last name
    """
    company_populate()
    # Does the person exist in people?
    if company_name in COMPANY:
        company = COMPANY.get(company_name)

    # otherwise, nope, not found
    else:
        abort(
            404, "Company with name {company_name} not found".format(company_name=company_name)
        )

    return company






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