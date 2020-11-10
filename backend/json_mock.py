import json


def authenticate_default():
    jsonmock = {
            "authenticate_default": {
                "username": "order_taker",
                "password": "ot1234"
            }
        }
        
    return json.dumps(jsonmock, indent = 4)
        
def authenticate_email_google():
    jsonmock = {
            "authenticate_email": {
                "email": "order_taker@gmail.com"
            }
        }
        
    return json.dumps(jsonmock, indent = 4)
        
def authenticate_email_facebook():
    jsonmock = {
            "authenticate_email": {
                "email": "order_taker@other.com"
            }
        }
        
    return json.dumps(jsonmock, indent = 4)
    
def create_shop():
    jsonmock = {
            "create_shop": {
                "name": "Test Created Shop",
                "email": None,
                "phone_number": None,
                "category": 2,
                "zones": [
                    {
                        "id": 4
                    },
                    {
                        "id": 4
                    },
                    {
                        "id": 4
                    },
                    {
                        "id": 4
                    }],
                "street": "Some Street",
                "city": "Some City",
                "providence": "Some Providence",
                "zip_4": "01234-5678"
            }
        }
        
    return json.dumps(jsonmock, indent = 4)
    
def create_zone():
    jsonmock = {
            "create_zone": {
                "name": "Test Created Zone"
            }
        }
        
    return json.dumps(jsonmock, indent = 4)
    
def create_shop_category():
    jsonmock = {
            "create_shop_category": {
                "type": "Temp Category 2"
            }
        }
        
    return json.dumps(jsonmock, indent = 4)
    
def create_shop_order():
    jsonmock = {
        "create_shop_order": {
            "shop_id": 4,
            "price_paid": True,
            "order_taker_id": 1,
            "order_items": [
                {
                    "id": 1,
                    "quantity_units": 100
                },
                {
                    "id": 2,
                    "quantity_units": 100
                },
                {
                    "id": 3,
                    "quantity_units": 2
                },
                {
                    "id": 4,
                    "quantity_units": 10
                },
                {
                    "id": 5,
                    "quantity_units": 10
                },
                {
                    "id": 6,
                    "quantity_units": 10000
                },
                {
                    "id": 7,
                    "quantity_units": 1
                },
                {
                    "id": 8,
                    "quantity_units": 100
                }]
            }
        }
        
    return json.dumps(jsonmock, indent = 4)
