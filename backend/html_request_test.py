import json_mock
import requests
import json

base_url = "http://localhost:8080/api"
authenticate_default = "/user/authenticate/default"
authenticate_gmail = "/user/authenticate/google"
authenticate_facebook = "/user/authenticate/facebook"
get_company_product = "/company_product/request/all"
get_shop_order_not_delivered = "/shop/request/not_delivered"
get_shop = "/shop/request/all"
get_zone = "/zone/request/all"
get_shop_category = "/shop_category/request/all"
create_chop = "/shop/create"
create_zone = "/zone/create"
create_shop_category = "/shop_category/create"
create_shop_order = "/shop_order/create"
update_shop_order_delevered = "/shop_order/update/delivered"

if __name__ == '__main__':
    print(requests.post(url = (base_url + "/shop/create"), json = json.loads(json_mock.create_shop())).json())