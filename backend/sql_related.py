"""sql_related.py: all SQL interface functions and table definitions"""

import flask_sqlalchemy
from main import db


class Sys_user_role(db.Model):
    """system user role database table definition"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    
    def __init__(self, n):
        self.name = n
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for Sys_user_role"""
        
        # delete all current entries
        for entry in database.session.query(Sys_user_role).all():
            database.session.delete(entry)
        
        # add bootrap entries
        database.session.add(Sys_user_role(
            "Order Taker"))
        database.session.add(Sys_user_role(
            "Order Fulfiller"))
        database.session.add(Sys_user_role(
            "Administrator"))
            
        database.session.commit()


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
    role = db.Column(db.Integer, db.ForeignKey('sys_user_role.id'), nullable=False)
    
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
        
        # delete all current entries
        for entry in database.session.query(Sys_user).all():
            database.session.delete(entry)
        
        # add bootrap entries
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
        
        
def database_bootstrap(database):
    Sys_user_role.bootstrap_populate(database)
    Sys_user.bootstrap_populate(database)
