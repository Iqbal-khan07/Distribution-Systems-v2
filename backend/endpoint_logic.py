"""
endpoint_logic.py: all endpoint implementation logic goes here
"""


import datetime
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

    query_result = database.session.query(sql_tables.Shop_order).filter(
        sql_tables.Shop_order.completed == False).all()

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
        date_delivered = entry.date_delivered_projected

        if date_delivered.day == current_time_utc.day and \
            date_delivered.month == current_time_utc.month and \
            date_delivered.year == current_time_utc.year:

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


def request_sys_user(database):
    """
    Returns a JSON of all sys_user entries in the database
    """

    query_result = database.session.query(sql_tables.Sys_user).all()

    result = []

    for sys_user in query_result:
        result.append(sys_user.request_sys_user_info(database))

    response = {
        "data": result
    }

    database.session.close()

    return response


def request_sys_user_role(database):
    """
    Returns a JSON of all sys_user_role entries in the database
    """

    query_result = database.session.query(sql_tables.Sys_user_role).all()

    result = []

    for role in query_result:
        result.append(role.request_sys_user_role_info())

    response = {
        "data": result
    }

    database.session.close()

    return response


def request_company(database):
    """
    Returns a JSON of all company entries in the database
    """

    query_result = database.session.query(sql_tables.Company).all()

    result = []

    for company in query_result:
        result.append(company.request_company_info(database))

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
        shop_category_query = database.session.query(sql_tables.Shop_category).filter(
            sql_tables.Shop_category.id == data_loaded["category"])

        if shop_category_query.count() == 0:
            shop_category_valid = False

    for zone in data_loaded["zones"]:
        zone_query = database.session.query(sql_tables.Zone).filter(
            sql_tables.Zone.id == zone["id"])

        if zone_query.count() == 0:
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
                shop_zone_query = database.session.query(sql_tables.Shop_zone).filter(
                    sql_tables.Shop_zone.shop == new_shop.id,
                    sql_tables.Shop_zone.zone == zone["id"])

                if shop_zone_query.count() != 0:
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

    zone_query = database.session.query(sql_tables.Zone).filter(
        sql_tables.Zone.name == data_loaded["name"])

    if zone_query.count() != 0:
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

    shop_category_query = database.session.query(sql_tables.Shop_category).filter(
        sql_tables.Shop_category.type == data_loaded["type"])

    if shop_category_query.count() != 0:
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
    3: invalid delivery date
    4: request quantity greater than stock
    5: duplicate item ids
    """

    data_loaded = data["data"]
    deliver_days_from_today = data_loaded["deliver_days_from_today"]

    # validate relational data fields
    shop_id_valid = True
    order_taker_valid = True
    shop_order_items_valid = True
    delivery_date_valid = True
    stock_valid = True
    no_duplicate_items = True

    shop_query = database.session.query(sql_tables.Shop).filter(
        sql_tables.Shop.id == data_loaded["shop_id"])

    sys_user_query = database.session.query(sql_tables.Sys_user).filter(
        sql_tables.Sys_user.id == data_loaded["order_taker_id"])

    if shop_query.count() == 0:
        shop_id_valid = False

    if sys_user_query.count() == 0:
        order_taker_valid = False

    if deliver_days_from_today < 0:
        delivery_date_valid = False

    price_total = float(0)

    # Validate all order_items and calc price_total
    for item in data_loaded["order_items"]:
        product_entries = database.session.query(sql_tables.Company_product).filter(
            sql_tables.Company_product.id == item["id"])

        if product_entries.count() == 0:
            shop_order_items_valid = False
            break
        else:
            if product_entries[0].stock < item["quantity_units"]:
                stock_valid = False
                break
            else:
                # calculate total price of order
                price_total += float(
                    (product_entries[0].price_sell / product_entries[0].units_per_price)
                    * item["quantity_units"])

    # Validate no duplicate item ids in order_item
    for pos, item in enumerate(data_loaded["order_items"], start=0):
        if pos == (len(data_loaded["order_items"]) - 1):
            break
        else:
            if item["id"] == data_loaded["order_items"][pos + 1]["id"]:
                no_duplicate_items = False
                break

    if not shop_order_items_valid:
        return 0
    elif not order_taker_valid:
        return 1
    elif not shop_id_valid:
        return 2
    elif not delivery_date_valid:
        return 3
    elif not stock_valid:
        return 4
    elif not no_duplicate_items:
        return 5
    else:
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

        # add new Shop_order_item entries to session and update stock
        for item in data_loaded["order_items"]:
            product_entry = database.session.query(sql_tables.Company_product).filter(
                sql_tables.Company_product.id == item["id"])[0]

            database.session.add(
                sql_tables.Shop_order_item(
                    new_shop_order.id,
                    item["id"],
                    item["quantity_units"]
                )
            )

            product_entry.stock -= item["quantity_units"]

        # commit new Shop_order_item entries and stock changes
        database.session.commit()

        response_inner = new_shop_order.request_shop_order(database)

    response = {
        "data": response_inner
    }

    database.session.close()

    return response


def create_user(database, data):
    """
    Adds a new entry to the Sys_user table and based on JSON data

    return values and what they mean:

    0: username already in use
    1: gmail already in use
    2: fb email already in use
    3: sys_user_role doesn't exist
    """

    data_loaded = data["data"]

    # validate relational data fields
    username_valid = True
    gmail_valid = True
    fbemail_valid = True
    role_valid = True

    username_query = database.session.query(sql_tables.Sys_user).filter(
        sql_tables.Sys_user.sys_username == data_loaded["sys_username"])

    gmail_query = database.session.query(sql_tables.Sys_user).filter(
        sql_tables.Sys_user.email_google == data_loaded["email_google"])

    fbemail_query = database.session.query(sql_tables.Sys_user).filter(
        sql_tables.Sys_user.email_fb == data_loaded["email_fb"])

    role_query = database.session.query(sql_tables.Sys_user_role).filter(
        sql_tables.Sys_user_role.id == data_loaded["role"])

    if username_query.count() != 0:
        username_valid = False

    if gmail_query.count() != 0:
        gmail_valid = False

    if fbemail_query.count() != 0:
        fbemail_valid = False

    if role_query.count() == 0:
        role_valid = False

    if not username_valid:
        return 0
    elif not gmail_valid:
        return 1
    elif not fbemail_valid:
        return 2
    elif not role_valid:
        return 3
    else:
        new_sys_user = sql_tables.Sys_user(
            data_loaded["name_first"],
            data_loaded["name_last"],
            data_loaded["sys_username"],
            data_loaded["password"],
            data_loaded["email_google"],
            data_loaded["email_fb"],
            data_loaded["image_url"],
            data_loaded["phone_number"],
            data_loaded["role"]
        )

        database.session.add(new_sys_user)
        database.session.commit()
        database.session.refresh(new_sys_user)

        response_inner = new_sys_user.request_sys_user_info(database)

    response = {
        "data": response_inner
    }

    database.session.close()

    return response


def create_company_product(database, data):
    """
    Adds a new entry to the Company_product table and based on JSON data

    return values and what they mean:

    0: invalid company id
    1: product with same name already exists with company id
    """

    data_loaded = data["data"]

    # validate relational data fields
    company_valid = True
    product_not_duplicate = True

    company_query = database.session.query(sql_tables.Company).filter(
        sql_tables.Company.id == data_loaded["company"])

    product_query = database.session.query(sql_tables.Company_product).filter(
        sql_tables.Company_product.company == data_loaded["company"],
        sql_tables.Company_product.name == data_loaded["name"])

    if company_query.count() == 0:
        company_valid = False

    if product_query.count() != 0:
        product_not_duplicate = False

    if not company_valid:
        return 0
    if not product_not_duplicate:
        return 1
    else:
        new_company_product = sql_tables.Company_product(
            data_loaded["company"],
            data_loaded["name"],
            float(data_loaded["price_buy"]),
            float(data_loaded["price_sell"]),
            data_loaded["units_per_price"],
            data_loaded["stock"],
            data_loaded["image_url"],
            data_loaded["description"]
        )

        database.session.add(new_company_product)
        database.session.commit()
        database.session.refresh(new_company_product)

        response_inner = new_company_product.request_company_product_info(database)

    response = {
        "data": response_inner
    }

    database.session.close()

    return response


def create_company(database, data):
    """
    Adds a new entry to the Company table and based on JSON data

    return values and what they mean:

    0: Company already exists with that name
    1: Invalid zone id
    """

    data_loaded = data["data"]

    # validate relational data fields
    name_valid = True
    zones_valid = True

    company_query = database.session.query(sql_tables.Company).filter(
        sql_tables.Company.name == data_loaded["name"])

    if company_query.count() != 0:
        name_valid = False

    for zone in data_loaded["zones"]:
        zone_query = database.session.query(sql_tables.Zone).filter(
            sql_tables.Zone.id == zone["id"])

        if zone_query.count() == 0:
            zones_valid = False
            break

    if not name_valid:
        return 0
    if not zones_valid:
        return 1
    else:
        new_company = sql_tables.Company(
            data_loaded["name"],
            data_loaded["image_url"]
        )

        database.session.add(new_company)
        database.session.commit()
        database.session.refresh(new_company)

        for zone in data_loaded["zones"]:
            # account for possible duplicate zone entries in request
            zone_query = database.session.query(sql_tables.Company_zone).filter(
                sql_tables.Company_zone.company == new_company.id,
                sql_tables.Company_zone.zone == zone["id"])

            if zone_query.count() != 0:
                continue

            database.session.add(sql_tables.Company_zone(new_company.id, zone["id"]))

            # commit new company_zone entries
            database.session.commit()

        response_inner = new_company.request_company_info(database)

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
        sql_tables.Shop_order.id == data_loaded["shop_order_id"])

    if shop_order_match_query.count() == 0:
        shop_order_id_valid = False
    elif shop_order_match_query[0].completed:
        shop_order_not_completed = False
    else:
        order_paid = shop_order_match_query[0].price_paid

    sys_user_query = database.session.query(sql_tables.Sys_user).filter(
        sql_tables.Sys_user.id == data_loaded["order_fulfiller_id"])

    if sys_user_query.count() == 0:
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


def goal_order_taker(database, data):
    """
    Returns goal data for an order taker based on JSON data

    return values and what they mean:

    0: invalid sys_user id
    1: sys_user not order taker
    2: no goal data found for order taker
    """

    order_taker_id = data["data"]["order_taker_id"]

    # validate relational data fields
    sys_user_valid = True
    order_taker_valid = True

    sys_user_query = database.session.query(sql_tables.Sys_user).filter(
        sql_tables.Sys_user.id == order_taker_id)

    if sys_user_query.count() == 0:
        sys_user_valid = False
    elif sys_user_query.all()[0].role != 1:
        order_taker_valid = False

    if not sys_user_valid:
        return 0
    elif not order_taker_valid:
        return 1
    else:
        current_date = datetime.datetime.now(datetime.timezone.utc)
        current_month = current_date.month
        current_year = current_date.year

        goal_query = database.session.query(sql_tables.Order_taker_goal).filter(
            sql_tables.Order_taker_goal.order_taker == order_taker_id,
            sql_tables.Order_taker_goal.month == current_month,
            sql_tables.Order_taker_goal.year == current_year)

        if goal_query.count() == 0:
            return 2
        else:
            goal_entry = goal_query.all()[0]

            orders_total = 0
            current_value_total = 0
            orders_paid = 0
            current_value_paid = 0
            orders_unpaid = 0
            current_value_unpaid = 0
            orders_completed = 0
            current_value_completed = 0

            order_query = database.session.query(sql_tables.Shop_order).filter(
                sql_tables.Shop_order.order_taker == order_taker_id).all()

            for entry in order_query:
                if entry.date_ordered.month == current_month:
                    orders_total += 1
                    current_value_total += entry.price_due

                    if entry.price_paid and not entry.completed:
                        orders_paid += 1
                        current_value_paid += entry.price_due
                    elif not entry.price_paid and not entry.completed:
                        orders_unpaid += 1
                        current_value_unpaid += entry.price_due
                    elif entry.completed:
                        orders_completed += 1
                        current_value_completed += entry.price_due

            response_inner = {
                "num_orders_total": orders_total,
                "current_value_total": current_value_total,
                "goal_total": goal_entry.goal_value,
                "orders_paid": {
                    "num_orders": orders_paid,
                    "current_value": current_value_paid
                },
                "orders_unpaid": {
                    "num_orders": orders_unpaid,
                    "current_value": current_value_unpaid
                },
                "orders_completed": {
                    "num_orders": orders_completed,
                    "current_value": current_value_completed
                }
            }

    response = {
        "data": response_inner
    }

    database.session.close()

    return response


def goal_order_taker_new(database, data):
    """
    Returns goal data for an order taker based on JSON data

    return values and what they mean:

    0: invalid sys_user id
    1: sys_user not order taker
    2: goal already exists for this month
    """

    order_taker_id = data["data"]["order_taker_id"]
    goal_value = data["data"]["goal_total"]

    # validate relational data fields
    sys_user_valid = True
    order_taker_valid = True

    sys_user_query = database.session.query(sql_tables.Sys_user).filter(
        sql_tables.Sys_user.id == order_taker_id)

    if sys_user_query.count() == 0:
        sys_user_valid = False
    elif sys_user_query.all()[0].role != 1:
        order_taker_valid = False

    if not sys_user_valid:
        return 0
    elif not order_taker_valid:
        return 1
    else:
        current_date = datetime.datetime.now(datetime.timezone.utc)
        current_month = current_date.month
        current_year = current_date.year

        goal_query = database.session.query(sql_tables.Order_taker_goal).filter(
            sql_tables.Order_taker_goal.order_taker == order_taker_id,
            sql_tables.Order_taker_goal.month == current_month,
            sql_tables.Order_taker_goal.year == current_year)

        if goal_query.count() != 0:
            return 2
        else:
            otg_new = sql_tables.Order_taker_goal(
                order_taker_id,
                current_month,
                current_year,
                float(goal_value)
            )

            database.session.add(otg_new)
            database.session.commit()
            database.session.refresh(otg_new)

    response = {
        "data": otg_new.request_order_taker_goal_info()
    }

    database.session.close()

    return response


def inventory_update(database, data):
    """
    Updates inventory data based on JSON data

    return values and what they mean:

    0: company product ids are not valid
    """

    inventory_data = data["data"]

    # validate relational data fields
    products_valid = True

    company_product_query = database.session.query(sql_tables.Company_product).all()

    for item in inventory_data:
        item_found = False

        for entry in company_product_query:
            if item["company_product_id"] == entry.id:
                item_found = True
                break

        if not item_found:
            products_valid = False
            break

    if not products_valid:
        return 0
    else:
        for item in inventory_data:
            for entry in company_product_query:
                if item["company_product_id"] == entry.id:
                    entry.stock += item["stock_delta"]

        database.session.commit()

    updated_query = database.session.query(sql_tables.Company_product).all()

    response_inner = []

    for entry in updated_query:
        response_inner.append(entry.request_company_product_info(database))

    response = {
        "data": response_inner
    }

    database.session.close()

    return response
