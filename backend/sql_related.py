"""sql_related.py: all SQL interface functions and table definitions"""

import flask_sqlalchemy
from main import db


class Shop(db.Model):
    """Shop database table definition"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    zone = db.Column(db.String(100))
    address = db.Column(db.String(300))
    
    def __init__(self, name_i, zone_i, address_i):
        self.name = name_i
        self.zone = zone_i
        self.address = address_i


class User(db.Model):
    """User database table definition"""
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.Integer)
    username = db.Column(db.String(50))
    password = db.Column(db.String(50))
    
    def __init__(self, role_i, username_i, password_i):
        self.role = role_i
        self.username = username_i
        self.password = password_i
