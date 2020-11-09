import json


def authenticate_default():
    jsonmock = {
            "authenticate_default": {
                "username": "order_taker",
                "password": "ot1234"
            }
        }
        
    return json.dumps(jsonmock, indent = 4)