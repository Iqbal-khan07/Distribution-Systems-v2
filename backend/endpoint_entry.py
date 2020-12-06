"""
endpoint_entry.py: All swagger.yml endpoints call functions here
"""


from flask import abort
from backend_main import DB
import endpoint_logic


def user_authenticate_default(auth_user_default):
    """
    This function links with endpoint:
    /user/authenticate/default
    through swagger.yml

    Response 200: Successful Authentication, returns sys_user data
    Response 401: Failed Authentication
    Response 400: Bad Request
    """

    response = endpoint_logic.authenticate_default(DB, auth_user_default)

    if isinstance(response, int):
        if response == 0:
            return "Failed Authentication", 401

        return "Bad Request", 400

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

    response = endpoint_logic.authenticate_email(DB, auth_user_gmail, True)

    if isinstance(response, int):
        if response == 0:
            return "Failed Authentication", 401

        return "Bad Request", 400

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

    response = endpoint_logic.authenticate_email(DB, auth_user_fb, False)

    if isinstance(response, int):
        if response == 0:
            return "Unauthorized", 401

        return "Bad Request", 400

    return response, 200


def get_company_product():
    """
    This function links with endpoint:
    /company_product/request/all
    through swagger.yml

    Response 200: Successful Request
    """

    return endpoint_logic.request_company_product(DB), 200


def get_order_not_delivered():
    """
    This function links with endpoint:
    /shop/request/not_delivered
    through swagger.yml

    Response 200: Successful Request
    """

    return endpoint_logic.request_shop_order_not_delivered(DB), 200


def get_order_today():
    """
    This function links with endpoint:
    /orders/today
    through swagger.yml

    Response 200: Successful Request
    """

    return endpoint_logic.request_shop_order_today(DB), 200


def get_all_shops():
    """
    This function links with endpoint:
    /shop/request/all
    through swagger.yml

    Response 200: Successful Request
    """

    return endpoint_logic.request_shop(DB), 200


def get_all_zones():
    """
    This function links with endpoint:
    /zone/request/all
    through swagger.yml

    Response 200: Successful Request
    """

    return endpoint_logic.request_zone(DB), 200


def get_all_shop_category():
    """
    This function links with endpoint:
    /shop_category/request/all
    through swagger.yml

    Response 200: Successful Request
    """

    return endpoint_logic.request_shop_category(DB), 200


def get_all_users():
    """
    This function links with endpoint:
    /users/all
    through swagger.yml

    Response 200: Successful Request
    """

    return endpoint_logic.request_sys_user(DB), 200


def get_all_user_roles():
    """
    This function links with endpoint:
    /users/roles/all
    through swagger.yml

    Response 200: Successful Request
    """

    return endpoint_logic.request_sys_user_role(DB), 200


def get_all_company():
    """
    This function links with endpoint:
    /company
    through swagger.yml

    Response 200: Successful Request
    """

    return endpoint_logic.request_company(DB), 200


def shop_create(new_shop):
    """
    This function links with endpoint:
    /shop/create
    through swagger.yml

    Response 200: Shop created successfully
    Response 400: Bad Request
    """

    response = endpoint_logic.create_shop(DB, new_shop)

    if isinstance(response, int):
        if response == 0:
            return "Zone does not exists with id provided", 400
        elif response == 1:
            return "Shop category does not exist with id provided", 400

        return "Bad Request", 400

    return response, 200


def zone_create(new_zone):
    """
    This function links with endpoint:
    /zone/create
    through swagger.yml

    Response 200: Zone created successfully
    Response 400: Bad Request
    """

    response = endpoint_logic.create_zone(DB, new_zone)

    if isinstance(response, int):
        if response == 0:
            return "Zone already exists with that name", 400

        return "Bad Request", 400

    return response, 200


def shop_category_create(new_shop_category):
    """
    This function links with endpoint:
    /shop_category/create
    through swagger.yml

    Response 200: Shop category created successfully
    Response 400: Bad Request
    """

    response = endpoint_logic.create_shop_category(DB, new_shop_category)

    if isinstance(response, int):
        if response == 0:
            return "Shop category already exists with that name", 400

        return "Bad Request", 400

    return response, 200


def shop_order_create(new_shop_order):
    """
    This function links with endpoint:
    /shop_order/create
    through swagger.yml

    Response 200: Shop order created successfully
    Response 400: Bad Request
    Response 409: Unable to perform request
    """

    response = endpoint_logic.create_shop_order(DB, new_shop_order)

    if isinstance(response, int):
        if response == 0:
            return "Company product does not exist with id provided", 400
        elif response == 1:
            return "Order Taker does not exist with id provided", 400
        elif response == 2:
            return "Shop does not exist with id provided", 400
        elif response == 3:
            return "Invalid delivery date, must be at least one day from today", 400
        elif response == 4:
            return "Requested quantity for item exceeds current stock", 409
        elif response == 5:
            return "No duplicate item ids allowed in order_items", 400

        return "Bad Request", 400

    return response, 200


def user_create(new_user):
    """
    This function links with endpoint:
    /create/user
    through swagger.yml

    Response 200: user created successfully
    Response 400: Bad Request
    """

    response = endpoint_logic.create_user(DB, new_user)

    if isinstance(response, int):
        if response == 0:
            return "A user with this username already exists", 400
        if response == 1:
            return "A user with this Google email already exists", 400
        if response == 2:
            return "A user with this Facebook email already exists", 400
        if response == 3:
            return "Invalid user role id", 400

        return "Bad Request", 400

    return response, 200


def company_product_create(new_product):
    """
    This function links with endpoint:
    /create/company_product
    through swagger.yml

    Response 200: company_product created successfully
    Response 400: Bad Request
    """

    response = endpoint_logic.create_company_product(DB, new_product)

    if isinstance(response, int):
        if response == 0:
            return "Invalid company id", 400
        elif response == 1:
            return "Product already exists with that name for this company", 400

        return "Bad Request", 400

    return response, 200


def company_create(new_company):
    """
    This function links with endpoint:
    /create/company
    through swagger.yml

    Response 200: company_product created successfully
    Response 400: Bad Request
    """

    response = endpoint_logic.create_company(DB, new_company)

    if isinstance(response, int):
        if response == 0:
            return "A company with that name already exists", 400
        elif response == 1:
            return "Invalid zone id", 400

        return "Bad Request", 400

    return response, 200


def shop_order_update(update_shop_order):
    """
    This function links with endpoint:
    /shop_order/update/delivered
    through swagger.yml

    Response 200: Shop order updated as delivered successfully
    Response 400: Bad Request
    """

    response = endpoint_logic.update_shop_order_delivered(DB, update_shop_order)

    if isinstance(response, int):
        if response == 0:
            return "Shop order is already completed", 400
        elif response == 1:
            return "Shop order does not exist with id provided", 400
        elif response == 2:
            return "Order Fulfiller does not exist with id provided", 400

        return "Bad Request", 400

    return response, 200


def goal_order_taker(order_taker_info):
    """
    This function links with endpoint:
    /goal/order_taker
    through swagger.yml

    Response 200: goal_order_taker data retrieved successfully
    Response 400: Bad Request
    Response 404: goal data not found
    """

    response = endpoint_logic.goal_order_taker(DB, order_taker_info)

    if isinstance(response, int):
        if response == 0:
            return "Invalid user id", 400
        elif response == 1:
            return "User is not an order taker", 400
        elif response == 2:
            return "No goal data for this month found for order taker", 404

        return "Bad Request", 400

    return response, 200


def goal_order_taker_new(goal_info):
    """
    This function links with endpoint:
    /create/goal/order_taker
    through swagger.yml

    Response 200: goal_order_taker data created successfully
    Response 400: Bad Request
    """

    response = endpoint_logic.goal_order_taker_new(DB, goal_info)

    if isinstance(response, int):
        if response == 0:
            return "Invalid user id", 400
        elif response == 1:
            return "User is not an order taker", 400
        elif response == 2:
            return "Goal for order taker already exists for this month", 400

        return "Bad Request", 400

    return response, 200


def inventory_update(inventory_data):
    """
    This function links with endpoint:
    /inventory/update
    through swagger.yml

    Response 200: inventory updated successfully
    Response 400: Bad Request
    """

    response = endpoint_logic.inventory_update(DB, inventory_data)

    if isinstance(response, int):
        if response == 0:
            return "Invalid company product id", 400

        return "Bad Request", 400

    return response, 200


def basic_auth(api_key):
    """
    Provides api key support for HTTP requests
    """

    print(api_key)
    print(type(api_key))
    if api_key != "38873888119208341920489043128490384398138409834":
        abort(401, "Incorrect API Key Given")
    return {}
