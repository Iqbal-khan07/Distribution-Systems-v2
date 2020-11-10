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
