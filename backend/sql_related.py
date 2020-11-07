"""sql_related.py: all SQL interface functions and table definitions"""

import flask_sqlalchemy
from main import db


class Sys_user(db.Model):
    """system user database table definition"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name_first = db.Column(db.String(50))
    name_last = db.Column(db.String(50))
    email = db.Column(db.String(100), nullable=False)
    # Note, password is currently plain text. In the future,
    # make this a hash with a salt
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(10))
    # This needs to be relational with sys_user_role
    role = db.Column(db.Integer, nullable=False)
    
    def __init__(self, nf, nl, em, pw, pn, r):
        self.name_first = nf
        self.name_last = nl
        self.email = em
        self.password = pw
        self.phone_number = pn
        self.role = r
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for Sys_user"""
        database.session.add(Sys_user(
            "John",
            "Smith",
            "js@gmail.com",
            "js1234",
            "1234567890",
            1))
        database.session.add(Sys_user(
            "Jane",
            "Doe",
            "jd@gmail.com",
            "jd1234",
            "1234567890",
            2))
        database.session.add(Sys_user(
            "Admin",
            "",
            "admin@gmail.com",
            "root",
            "1234567890",
            3))
            
        database.session.commit()
