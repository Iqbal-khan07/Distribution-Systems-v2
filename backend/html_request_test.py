"""
html_request_test.py: functions that send mocked data as HTTP requests to test endpoints go here
"""


import json_mock
import requests
import json

base_url = "http://localhost:8080/api"
#base_url = "https://arcane-scrubland-51912.herokuapp.com/api"

authenticate_default = "/authenticate/default"
authenticate_gmail = "/authenticate/google"
authenticate_facebook = "/authenticate/facebook"

get_company_product = "/inventory"
inventory_update = "/inventory/update"

get_shop_order_not_delivered = "/orders/not_delivered"
get_shop_order_today = "/orders/today"
get_shop = "/shops/all"
get_zone = "/zones/all"
get_shop_category = "/shop_categories/all"
get_users = "/users/all"
get_user_role = "/users/roles/all"
get_company = "/company"

create_shop = "/create/shop"
create_zone = "/create/zone"
create_shop_category = "/create/shop_category"
create_shop_order = "/create/shop_order"
create_user = "/create/user"
create_company_product = "/create/company_product"
create_company = "/create/company"

update_shop_order_delevered = "/deliver/shop_order"

goal_order_taker = "/goal/order_taker"
goal_order_taker_new = "/create/goal/order_taker"


def spacer():
    print("___________________________________________________________")


def auth_default():
    print(requests.post(url = (base_url + authenticate_default), json = json.loads(json_mock.authenticate_default())).json())
    spacer()
def auth_gmail():
    print(requests.post(url = (base_url + authenticate_gmail), json = json.loads(json_mock.authenticate_email_google())).json())
    spacer()
def auth_fb():
    print(requests.post(url = (base_url + authenticate_facebook), json = json.loads(json_mock.authenticate_email_facebook())).json())
    spacer()


def get_comp_prod():
    print(requests.get(url = (base_url + get_company_product)).json())
    spacer()
def get_so_nd():
    print(requests.get(url = (base_url + get_shop_order_not_delivered)).json())
    spacer()
def get_so_t():
    print(requests.get(url = (base_url + get_shop_order_today)).json())
    spacer()
def get_sh():
    print(requests.get(url = (base_url + get_shop)).json())
    spacer()
def get_z():
    print(requests.get(url = (base_url + get_zone)).json())
    spacer()
def get_s_c():
    print(requests.get(url = (base_url + get_shop_category)).json())
    spacer()
def get_u():
    print(requests.get(url = (base_url + get_users)).json())
    spacer()
def get_u_r():
    print(requests.get(url = (base_url + get_user_role)).json())
    spacer()
def get_c():
    print(requests.get(url = (base_url + get_company)).json())
    spacer()


def create_s():
    print(requests.post(url = (base_url + create_shop), json = json.loads(json_mock.create_shop())).json())
    spacer()
def create_z():
    print(requests.post(url = (base_url + create_zone), json = json.loads(json_mock.create_zone())).json())
    spacer()
def create_s_c():
    print(requests.post(url = (base_url + create_shop_category), json = json.loads(json_mock.create_shop_category())).json())
    spacer()
def create_s_o():
    print(requests.post(url = (base_url + create_shop_order), json = json.loads(json_mock.create_shop_order())).json())
    spacer()
def create_u():
    print(requests.post(url = (base_url + create_user), json = json.loads(json_mock.create_user())).json())
    spacer()
def create_c_p():
    print(requests.post(url = (base_url + create_company_product), json = json.loads(json_mock.create_company_product())).json())
    spacer()
def create_c():
    print(requests.post(url = (base_url + create_company), json = json.loads(json_mock.create_company())).json())
    spacer()


def update_sod():
    print(requests.post(url = (base_url + update_shop_order_delevered), json = json.loads(json_mock.update_shop_order_delivered())).json())
    spacer()


def g_ot():
    print(requests.post(url = (base_url + goal_order_taker), json = json.loads(json_mock.goal_order_taker())).json())
    spacer()
def g_ot_n():
    print(requests.post(url = (base_url + goal_order_taker_new), json = json.loads(json_mock.goal_order_taker_new())).json())
    spacer()

def i_u():
    print(requests.post(url = (base_url + inventory_update), json = json.loads(json_mock.inventory_update())).json())
    spacer()


if __name__ == '__main__':
    #auth_default()
    #auth_gmail()
    #auth_fb()
    #get_comp_prod()
    #get_so_nd()
    #get_so_t()
    #get_sh()
    #get_z()
    #get_s_c()
    #get_u()
    #get_u_r()
    #get_c()
    #create_s()
    #create_z()
    #create_s_c()
    #create_s_o()
    #create_u()
    #create_c_p()
    create_c()
    #update_sod()
    #g_ot()
    #g_ot_n()
    #i_u()
