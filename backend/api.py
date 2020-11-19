import flask
import flask_sqlalchemy
from datetime import datetime
import backend_main
from pytz import timezone
import requests
import os
from backend_main import db, app_flask
from backend_main import sql_related
import json

# 3rd party modules
from flask import make_response, abort


def get_timestamp():
    tz = timezone("EST")
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
    This function links with endpoint:
    /user/authenticate/default
    through swagger.yml

    Response 200: Successful Authentication, returns sys_user data
    Response 401: Failed Authentication
    Response 400: Bad Request
    """

    response = sql_related.authenticate_default(db, auth_user_default)

    if type(response) == int:
        if response == 0:
            return "Failed Authentication", 401
        else:
            return "Bad Request", 400
    else:
        return response, 200


def user_authenticate_gmail(auth_user_gmail):
    """
    This function links with endpoint:
    /user/authenticate/gmail
    through swagger.yml

    Response 200: Successful Authentication, returns sys_user data
    Response 401: Failed Authentication
    Response 400: Bad Request
    """

    response =  sql_related.authenticate_email(db, auth_user_gmail, True)

    if type(response) == int:
        if response == 0:
            return "Failed Authentication", 401
        else:
            return "Bad Request", 400
    else:
        return response, 200


def user_authenticate_fb(auth_user_fb):
    """
    This function links with endpoint:
    /user/authenticate/facebook
    through swagger.yml

    Response 200: Successful Authentication, returns sys_user data
    Response 401: Failed Authentication
    Response 400: Bad Request
    """

    response =  sql_related.authenticate_email(db, auth_user_fb, False)

    if type(response) == int:
        if response == 0:
            return "Unauthorized", 401
        else:
            return "Bad Request", 400
    else:
        return response, 200


def get_company_product():
    """
    This function links with endpoint:
    /company_product/request/all
    through swagger.yml

    Response 200: Successful Request
    """
    
    return sql_related.request_company_product(db), 200


def get_order_not_delivered():
    """
    This function links with endpoint:
    /shop/request/not_delivered
    through swagger.yml

    Response 200: Successful Request
    """

    return sql_related.request_shop_order_not_delivered(db), 200


# Create a handler for our read (GET) people
def get_all_shops():
    """
    This function links with endpoint:
    /shop/request/all
    through swagger.yml

    Response 200: Successful Request
    """

    return sql_related.request_shop(db), 200


def get_all_zones():
    """
    This function links with endpoint:
    /zone/request/all
    through swagger.yml

    Response 200: Successful Request
    """

    return sql_related.request_zone(db), 200


def get_all_shop_category():
    """
    This function links with endpoint:
    /shop_category/request/all
    through swagger.yml

    Response 200: Successful Request
    """

    return sql_related.request_shop_category(db), 200


def shop_create(new_shop):
    """
    This function links with endpoint:
    /shop/create
    through swagger.yml

    Response 200: Successful Authentication, returns sys_user data
    Response 400: Bad Request
    """

    response =  sql_related.create_shop(db, new_shop)

    if type(response) == int:
        if response == 0:
            return "Zone does not exists with id provided", 400
        elif response == 1:
            return "Shop category does not exists with id provided", 400
        else:
            return "Bad Request", 400
    else:
        return response, 200


def zone_create(new_zone):
    """
    This function creates a new person in the people structure
    based on the passed in person data
    :param person:  person to create in people structure
    :return:        201 on success, 406 on person exists
    """
    return sql_related.create_zone(db, new_zone)
    
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
    return sql_related.create_shop_category(db, new_shop_category)
    
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
    return sql_related.create_shop_order(db, new_shop_order)
    
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
    return sql_related.update_shop_order_delivered(db, update_shop_order)
    
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
    if apiKey != "38873888119208341920489043128490384398138409834":
        abort(401, "Incorrect API Key Given")
    return {}
