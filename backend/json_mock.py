"""
json_mock.py: functions that mock json data for testing HTML requests go here
"""


import json


def authenticate_default():
    jsonmock = {"data": {"username": "denisse", "password": "dm1234"}}

    return json.dumps(jsonmock, indent=4)


def authenticate_email_google():
    jsonmock = {"data": {"email": "order_taker@gmail.com"}}

    return json.dumps(jsonmock, indent=4)


def authenticate_email_facebook():
    jsonmock = {"data": {"email": "order_taker@other.com"}}

    return json.dumps(jsonmock, indent=4)


def create_shop():
    jsonmock = {
        "data": {
            "name": "Test Created Shop",
            "email": None,
            "image_url": "https://images.sftcdn.net/images/t_app-cover-" +
                "l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/2606637" +
                "10/the-test-fun-for-friends-screenshot.jpg",
            "phone_number": None,
            "category": None,
            "zones": [{"id": 1}, {"id": 2}, {"id": 3}, {"id": 4}],
            "street": "Some Street",
            "city": "Some City",
            "providence": "Some Providence",
            "zip_4": "01234-5678",
        }
    }

    return json.dumps(jsonmock)


def create_zone():
    jsonmock = {"data": {"name": "Test Created Zone 2"}}

    return json.dumps(jsonmock, indent=4)


def create_shop_category():
    jsonmock = {"data": {"type": "Temp Category 3"}}

    return json.dumps(jsonmock, indent=4)


def create_shop_order():
    jsonmock = {
        "data": {
            "shop_id": 3,
            "price_paid": True,
            "deliver_days_from_today": 0,
            "memo": "big smelly memo",
            "order_taker_id": 1,
            "order_items": [
                {"id": 1, "quantity_units": 10},
                {"id": 2, "quantity_units": 12},
                {"id": 3, "quantity_units": 33},
                {"id": 4, "quantity_units": 100},
                {"id": 5, "quantity_units": 22},
                {"id": 6, "quantity_units": 33},
                {"id": 7, "quantity_units": 5},
                {"id": 8, "quantity_units": 400}
            ],
        }
    }

    return json.dumps(jsonmock, indent=4)


def create_user():
    jsonmock = {
        "data": {
            "name_first": "Shresht",
            "name_last": "Rengesh",
            "sys_username": "shresht_rengesh",
            "password": "sr1234",
            "email_google": "?",
            "email_fb": "?",
            "image_url": "https://ca.slack-edge.com/T017" +
                "JP7PHFY-U018FALKD5E-266eb5ee4568-512",
            "phone_number": "1234567890",
            "role": 3
        }
    }

    return json.dumps(jsonmock, indent=4)


def create_company_product():
    jsonmock = {
        "data": {
            "company": 2,
            "name": "test_created_product",
            "price_buy": 100.00,
            "price_sell": 200.00,
            "units_per_price": 3,
            "stock": 0,
            "image_url": "https://upload.wikimedia.org/wikipedia/commons" +
                "/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
            "description": "test item!!"
        }
    }

    return json.dumps(jsonmock, indent=4)


def update_shop_order_delivered():
    jsonmock = {
        "data": {"shop_order_id": 4, "order_fulfiller_id": 2}
    }

    return json.dumps(jsonmock, indent=4)


def goal_order_taker():
    jsonmock = {
        "data": {"order_taker_id": 4}
    }

    return json.dumps(jsonmock, indent=4)


def goal_order_taker_new():
    jsonmock = {
        "data": {
            "order_taker_id": 4,
            "goal_total": 300000.12
        }
    }

    return json.dumps(jsonmock, indent=4)


def inventory_update():
    jsonmock = {
        "data": [
            {"company_product_id": 1, "stock_delta": 1},
            {"company_product_id": 2, "stock_delta": -2},
            {"company_product_id": 3, "stock_delta": 3},
            {"company_product_id": 4, "stock_delta": 4},
            {"company_product_id": 5, "stock_delta": -5},
            {"company_product_id": 6, "stock_delta": 6},
            {"company_product_id": 7, "stock_delta": -1},
            {"company_product_id": 8, "stock_delta": 600},
        ]
    }

    return json.dumps(jsonmock, indent=4)
