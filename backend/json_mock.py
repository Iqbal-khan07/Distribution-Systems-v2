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
