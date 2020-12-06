"""
html_request_test.py: functions that send mocked data as HTTP requests to test endpoints go here
"""


import json
import requests
import json_mock


#BASE_URL = "http://localhost:8080/api"
BASE_URL = "https://arcane-scrubland-51912.herokuapp.com/api"

AUTH_DEFAULT = "/authenticate/default"
AUTH_GOOGLE = "/authenticate/google"
AUTH_FB = "/authenticate/facebook"

GET_COMP_PROD = "/inventory"
INV_UPDATE = "/inventory/update"

GET_SO_NOT_DELIVERED = "/orders/not_delivered"
GET_SO_TODAY = "/orders/today"
GET_SHOP = "/shops/all"
GET_ZONE = "/zones/all"
GET_SHOP_CAT = "/shop_categories/all"
GET_USERS = "/users/all"
GET_USER_ROLE = "/users/roles/all"
GET_COMP = "/company"

CREATE_SHOP = "/create/shop"
CREATE_ZONE = "/create/zone"
CREATE_SHOP_CAT = "/create/shop_category"
CREATE_SO = "/create/shop_order"
CREATE_USER = "/create/user"
CREATE_COMP_PROD = "/create/company_product"
CREATE_COMP = "/create/company"

UPDATE_SO_DELIVERED = "/deliver/shop_order"

GOAL_OT = "/goal/order_taker"
CREATE_GOAL_OT = "/create/goal/order_taker"


def spacer():
    """
    Prints line spacer for readability
    """

    print("___________________________________________________________")


def auth_default():
    """
    Tests the default authentication endpoint
    """

    print(requests.post(url=(BASE_URL + AUTH_DEFAULT), json=
                        json.loads(json_mock.authenticate_default())).json())

    spacer()


def auth_gmail():
    """
    Tests the google authentication endpoint
    """

    print(requests.post(url=(BASE_URL + AUTH_GOOGLE), json=
                        json.loads(json_mock.authenticate_email_google())).json())

    spacer()


def auth_fb():
    """
    Tests the facebook authentication endpoint
    """

    print(requests.post(url=(BASE_URL + AUTH_FB), json=
                        json.loads(json_mock.authenticate_email_facebook())).json())

    spacer()


def get_comp_prod():
    """
    Tests the get all company_product endpoint
    """

    print(requests.get(url=(BASE_URL + GET_COMP_PROD)).json())

    spacer()


def get_so_nd():
    """
    Tests the get all shop_order not delivered endpoint
    """

    print(requests.get(url=(BASE_URL + GET_SO_NOT_DELIVERED)).json())

    spacer()


def get_so_t():
    """
    Tests the get all shop_order for today endpoint
    """

    print(requests.get(url=(BASE_URL + GET_SO_TODAY)).json())

    spacer()


def get_sh():
    """
    Tests the get all shop endpoint
    """

    print(requests.get(url=(BASE_URL + GET_SHOP)).json())

    spacer()


def get_z():
    """
    Tests the get all zone endpoint
    """

    print(requests.get(url=(BASE_URL + GET_ZONE)).json())

    spacer()


def get_s_c():
    """
    Tests the get all shop_category endpoint
    """

    print(requests.get(url=(BASE_URL + CREATE_SHOP_CAT)).json())

    spacer()


def get_u():
    """
    Tests the get all sys_user endpoint
    """

    print(requests.get(url=(BASE_URL + GET_USERS)).json())

    spacer()


def get_u_r():
    """
    Tests the get all sys_user_role endpoint
    """

    print(requests.get(url=(BASE_URL + GET_USER_ROLE)).json())

    spacer()


def get_c():
    """
    Tests the get all company endpoint
    """

    print(requests.get(url=(BASE_URL + GET_COMP)).json())

    spacer()


def create_s():
    """
    Tests the create shop endpoint
    """

    print(requests.post(url=(BASE_URL + CREATE_SHOP), json=
                        json.loads(json_mock.create_shop())).json())

    spacer()


def create_z():
    """
    Tests the create zone endpoint
    """

    print(requests.post(url=(BASE_URL + CREATE_ZONE), json=
                        json.loads(json_mock.create_zone())).json())

    spacer()


def create_s_c():
    """
    Tests the create shop_category endpoint
    """

    print(requests.post(url=(BASE_URL + CREATE_SHOP_CAT), json=
                        json.loads(json_mock.create_shop_category())).json())

    spacer()


def create_s_o():
    """
    Tests the create shop_order endpoint
    """

    print(requests.post(url=(BASE_URL + CREATE_SO), json=
                        json.loads(json_mock.create_shop_order())).json())

    spacer()


def create_u():
    """
    Tests the create sys_user endpoint
    """

    print(requests.post(url=(BASE_URL + CREATE_USER), json=
                        json.loads(json_mock.create_user())).json())

    spacer()


def create_c_p():
    """
    Tests the create company_product endpoint
    """

    print(requests.post(url=(BASE_URL + CREATE_COMP_PROD), json=
                        json.loads(json_mock.create_company_product())).json())

    spacer()


def create_c():
    """
    Tests the create company endpoint
    """

    print(requests.post(url=(BASE_URL + CREATE_COMP), json=
                        json.loads(json_mock.create_company())).json())

    spacer()


def update_sod():
    """
    Tests the update shop_order as delivered endpoint
    """

    print(requests.post(url=(BASE_URL + UPDATE_SO_DELIVERED), json=
                        json.loads(json_mock.update_shop_order_delivered())).json())

    spacer()


def g_ot():
    """
    Tests the get order_taker goal for current month endpoint
    """

    print(requests.post(url=(BASE_URL + GOAL_OT), json=
                        json.loads(json_mock.goal_order_taker())).json())

    spacer()


def g_ot_n():
    """
    Tests the create order_taker goal for current month endpoint
    """

    print(requests.post(url=(BASE_URL + CREATE_GOAL_OT), json=
                        json.loads(json_mock.goal_order_taker_new())).json())

    spacer()


def i_u():
    """
    Tests the inventory update endpoint
    """

    print(requests.post(url=(BASE_URL + INV_UPDATE), json=
                        json.loads(json_mock.inventory_update())).json())

    spacer()


if __name__ == '__main__':
    auth_default()
    auth_gmail()
    auth_fb()
    get_comp_prod()
    get_so_nd()
    get_so_t()
    get_sh()
    get_z()
    get_s_c()
    get_u()
    get_u_r()
    get_c()
    create_s()
    create_z()
    create_s_c()
    create_s_o()
    create_u()
    create_c_p()
    create_c()
    update_sod()
    g_ot()
    g_ot_n()
    i_u()
