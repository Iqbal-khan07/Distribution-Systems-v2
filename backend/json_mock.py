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
                {"id": 1, "quantity_units": 100},
                {"id": 2, "quantity_units": 100},
                {"id": 3, "quantity_units": 2},
                {"id": 4, "quantity_units": 10},
                {"id": 5, "quantity_units": 10},
                {"id": 6, "quantity_units": 10000},
                {"id": 7, "quantity_units": 1},
                {"id": 8, "quantity_units": 100},
            ],
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
