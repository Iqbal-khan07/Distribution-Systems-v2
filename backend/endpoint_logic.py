"""
endpoint_logic.py: all endpoint implementation logic goes here
"""


import flask_sqlalchemy
import datetime
import json
from flask import jsonify
import sql_tables


def authenticate_default(database, data):
    """
    This function authenticates a user based upon 
    Sys_user: sys_username and password database fields
    by checking passed parameters against the database

    return values and what they mean:

    0: invalid login credentials
    """

    data_loaded = data

    username_login = data_loaded["data"]["username"]
    password_login = data_loaded["data"]["password"]

    query_result = (
        database.session.query(sql_tables.Sys_user)
        .filter(
            sql_tables.Sys_user.sys_username == username_login, 
            sql_tables.Sys_user.password == password_login
        )
        .all()
    )

    if query_result:
        response_inner = query_result[0].request_sys_user_info(database)
    else:
        return 0

    response = {
            "data": response_inner
        }
    
    database.session.close()

    return response


def authenticate_email(database, data, google):
    """
    This function authenticates a user based upon 
    Sys_user: email_google or email_fb database fields
    by checking passed parameters against either
    email_google if google = True or
    email_fb if google = False

    return values and what they mean:

    0: invalid login credentials
    """

    data_loaded = data

    email_login = data_loaded["data"]["email"]

    if google:
        query_result = (
            database.session.query(sql_tables.Sys_user).filter(
                sql_tables.Sys_user.email_google == email_login).all()
        )
    else:
        query_result = (
            database.session.query(sql_tables.Sys_user).filter(
                sql_tables.Sys_user.email_fb == email_login).all()
        )

    if query_result:
        response_inner = query_result[0].request_sys_user_info(database)
    else:
        return 0

    response = {
            "data": response_inner
        }

    database.session.close()

    return response


def request_company_product(database):
    """
    Returns a JSON of all company_product entries in the database
    """

    query_result = database.session.query(sql_tables.Company_product).all()

    result = []

    for item in query_result:
        result.append(item.request_company_product_info(database))

    response = {
            "data": result
        }

    database.session.close()

    return response


def request_shop_order_not_delivered(database):
    """
    Returns a JSON of all shop_order entries in the database
    that have not been delivered
    """

    query_result = (
        database.session.query(sql_tables.Shop_order).filter(
            sql_tables.Shop_order.completed == False).all()
    )

    result = []

    for item in query_result:
        result.append(item.request_shop_order(database))

    response = {
        "data": result
    }

    database.session.close()

    return response


def request_shop_order_today(database):
    """
    Returns a JSON of all shop_order entries in the database
    that have a date_delivered_projected for today
    """

    query_result = (
        database.session.query(sql_tables.Shop_order).all()
    )

    current_time_utc = datetime.datetime.now(datetime.timezone.utc)
    
    result = []

    for entry in query_result:
        dp = entry.date_delivered_projected

        if dp.day == current_time_utc.day and \
            dp.month == current_time_utc.month and \
            dp.year == current_time_utc.year:

            result.append(entry.request_shop_order(database))

    response = {
        "data": result
    }

    database.session.close()

    return response


def request_shop(database):
    """
    Returns a JSON of all shop entries in the database
    """

    query_result = database.session.query(sql_tables.Shop).all()

    result = []

    for item in query_result:
        result.append(item.request_shop_info(database))

    response = {
            "data": result
        }

    database.session.close()

    return response


def request_zone(database):
    """
    Returns a JSON of all zone entries in the database
    """

    query_result = database.session.query(sql_tables.Zone).all()

    result = []

    for item in query_result:
        result.append(item.request_zone_info())

    response = {
            "data": result
        }

    database.session.close()

    return response


def request_shop_category(database):
    """
    Returns a JSON of all shop categories in the database
    """

    query_result = database.session.query(sql_tables.Shop_category).all()

    result = []

    for item in query_result:
        result.append(item.request_category_info())

    response = {
            "data": result
        }

    database.session.close()

    return response


def create_shop(database, data):
    """
    Adds a new entry to the shop table and populates shop_zone
    entries for itbased on JSON data
    
    return values and what they mean:

    0: invalid zone id
    1: invalid shop category id
    """

    # data_loaded = json.loads(data)["create_shop"]
    data_loaded = data["data"]

    # validate relational data fields
    shop_category_valid = True
    zones_valid = True
    
    if data_loaded["category"] != None:
        if (
            database.session.query(sql_tables.Shop_category).filter(
                sql_tables.Shop_category.id == data_loaded["category"]).count() == 0
        ):
    
            shop_category_valid = False

    for zone in data_loaded["zones"]:
        if database.session.query(sql_tables.Zone).filter(
            sql_tables.Zone.id == zone["id"]).count() == 0:

            zones_valid = False
            break

    # handle response
    if shop_category_valid:
        if zones_valid:
            # new Shop object
            new_shop = sql_tables.Shop(
                data_loaded["name"],
                data_loaded["email"],
                data_loaded["image_url"],
                data_loaded["phone_number"],
                data_loaded["category"],
                data_loaded["street"],
                data_loaded["city"],
                data_loaded["providence"],
                data_loaded["zip_4"],
            )

            # add, commit, then refresh Shop object to update with commit
            database.session.add(new_shop)
            database.session.commit()
            database.session.refresh(new_shop)

            # add new shop_zone entries to session
            for zone in data_loaded["zones"]:
                # account for possible duplicate zone entries in request
                if (
                    database.session.query(sql_tables.Shop_zone).filter(
                        sql_tables.Shop_zone.shop == new_shop.id, 
                        sql_tables.Shop_zone.zone == zone["id"]).count() != 0
                ):

                    continue

                database.session.add(sql_tables.Shop_zone(new_shop.id, zone["id"]))

            # commit new shop_zone entries
            database.session.commit()

            response_inner = new_shop.request_shop_info(database)
        else:
            return 0
    else:
        return 1

    response = {
            "data": response_inner
        }

    database.session.close()

    return response


def create_zone(database, data):
    """
    Adds a new entry to the zone table based on JSON data
    
    return values and what they mean:

    0: zone with name already exists
    """

    data_loaded = data["data"]

    # validate relational data fields
    zone_name_valid = True

    if (
        database.session.query(sql_tables.Zone).filter(
            sql_tables.Zone.name == data_loaded["name"]).count() != 0
    ):

        zone_name_valid = False

    if zone_name_valid:
        # create new Zone object
        new_zone = sql_tables.Zone(data_loaded["name"])

        # add, commit, then refresh Zone object to update with commit
        database.session.add(new_zone)
        database.session.commit()
        database.session.refresh(new_zone)

        response_inner = new_zone.request_zone_info()
    else:
        return 0

    response = {
            "data": response_inner
        }

    database.session.close()

    return response


def create_shop_category(database, data):
    """
    Adds a new entry to the shop_category table based on JSON data
    
    return values and what they mean:

    0: shop category with name already exists
    """

    data_loaded = data["data"]

    # validate relational data fields
    shop_category_type_valid = True

    if (
        database.session.query(sql_tables.Shop_category).filter(
            sql_tables.Shop_category.type == data_loaded["type"]).count() != 0
    ):

        shop_category_type_valid = False

    if shop_category_type_valid:
        # create new Shop_category object
        new_shop_category = sql_tables.Shop_category(data_loaded["type"])

        # add, commit, then refresh Shop_category object to update with commit
        database.session.add(new_shop_category)
        database.session.commit()
        database.session.refresh(new_shop_category)

        response_inner = new_shop_category.request_category_info()
    else:
        return 0

    response = {
            "data": response_inner
        }

    database.session.close()

    return response


def create_shop_order(database, data):
    """
    Adds a new entry to the Shop_order table and
    populates Shop_order_item entries for it based on JSON data
    
    return values and what they mean:

    0: invalid company product id
    1: invalid order taker id
    2: invalid shop id
    """

    data_loaded = data["data"]
    deliver_days_from_today = data_loaded["deliver_days_from_today"]

    # validate relational data fields
    shop_id_valid = True
    order_taker_valid = True
    shop_order_items_valid = True
    delivery_date_valid = True

    if (
        database.session.query(sql_tables.Shop).filter(
            sql_tables.Shop.id == data_loaded["shop_id"]).count() == 0
    ):

        shop_id_valid = False

    if (
        database.session.query(sql_tables.Sys_user).filter(
            sql_tables.Sys_user.id == data_loaded["order_taker_id"]).count() == 0
    ):

        order_taker_valid = False

    if deliver_days_from_today < 0:
        delivery_date_valid = False

    price_total = float(0)

    for item in data_loaded["order_items"]:
        product_entries = database.session.query(sql_tables.Company_product).filter(
            sql_tables.Company_product.id == item["id"]
        )

        if product_entries.count() == 0:
            shop_order_items_valid = False
            break
        else:
            # calculate total price of order
            price_total += float(
                (product_entries[0].price_sell / product_entries[0].units_per_price)
                * item["quantity_units"]
            )

    if delivery_date_valid:
        if shop_id_valid:
            if order_taker_valid:
                if shop_order_items_valid:
                    # get current datetime and one week from now
                    current_time_utc = datetime.datetime.now(datetime.timezone.utc)
                    delivery_date = current_time_utc + datetime.timedelta(days=deliver_days_from_today)
    
                    # new Shop_order object
                    new_shop_order = sql_tables.Shop_order(
                        data_loaded["shop_id"],
                        price_total,
                        False,
                        data_loaded["memo"],
                        current_time_utc,
                        delivery_date,
                        None,
                        data_loaded["order_taker_id"],
                        None,
                        False,
                    )
    
                    # add, commit, then refresh Shop object to update with commit
                    database.session.add(new_shop_order)
                    database.session.commit()
                    database.session.refresh(new_shop_order)
    
                    # add new shop_zone entries to session
                    for item in data_loaded["order_items"]:
                        # account for possible duplicate zone entries in request
                        duplicate_check_query = database.session.query(sql_tables.Shop_order_item).filter(
                            sql_tables.Shop_order_item.shop_order == new_shop_order.id, 
                            sql_tables.Shop_order_item.company_product == item["id"])
    
                        if duplicate_check_query.count() != 0:
                            duplicate_check_query[0].quantity_units += item[
                                "quantity_units"]
                        else:
                            database.session.add(
                                sql_tables.Shop_order_item(
                                    new_shop_order.id, item["id"], item["quantity_units"]
                                )
                            )
    
                    # commit new shop_zone entries
                    database.session.commit()
    
                    response_inner = new_shop_order.request_shop_order(database)
                else:
                    return 0
            else:
                return 1
        else:
            return 2
    else:
        return 3

    response = {
        "data": response_inner
    }

    database.session.close()

    return response


def update_shop_order_delivered(database, data):
    """
    Updates a shop_order table entry as delivered based on JSON data
    
    return values and what they mean:

    0: shop order already completed
    1: invalid shop order id
    2: invalid order fulfiller id
    """

    data_loaded = data["data"]

    # validate relational data fields
    shop_order_id_valid = True
    shop_order_not_completed = True
    order_fulfiller_id_valid = True

    shop_order_match_query = database.session.query(sql_tables.Shop_order).filter(
        sql_tables.Shop_order.id == data_loaded["shop_order_id"]
    )

    if shop_order_match_query.count() == 0:
        shop_order_id_valid = False
    elif shop_order_match_query[0].completed == True:
        shop_order_not_completed = False
    else:
        order_paid = shop_order_match_query[0].price_paid

    if (
        database.session.query(sql_tables.Sys_user)
        .filter(sql_tables.Sys_user.id == data_loaded["order_fulfiller_id"])
        .count()
        == 0
    ):

        order_fulfiller_id_valid = False

    if order_fulfiller_id_valid:
        if shop_order_id_valid:
            if shop_order_not_completed:
                current_time_utc = datetime.datetime.now(datetime.timezone.utc)

                shop_order_match_query[0].price_paid = True
                shop_order_match_query[0].date_delivered = current_time_utc
                shop_order_match_query[0].order_fulfiller = data_loaded[
                    "order_fulfiller_id"
                ]
                shop_order_match_query[0].completed = True

                database.session.commit()

                if order_paid:
                    response_inner = {"request_payment": False}
                else:
                    response_inner = {"request_payment": True}
            else:
                return 0
        else:
            return 1
    else:
        return 2

    response = {
            "data": response_inner
        }

    database.session.close()

    return response
