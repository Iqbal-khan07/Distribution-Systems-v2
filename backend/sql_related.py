"""sql_related.py: all SQL interface functions and table definitions"""

import flask_sqlalchemy
from backend_main import db


class Sys_user_role(db.Model):
    """system user role database table definition"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    
    def __init__(self, na):
        self.name = na
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for Sys_user_role"""
        
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
    name_first = db.Column(db.String(50), nullable=False)
    name_last = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    # Note, password is currently plain text. In the future,
    # make this a hash with a salt
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(10), nullable=True)
    role = db.Column(db.Integer, db.ForeignKey('sys_user_role.id'), nullable=False)
    
    def __init__(self, nf, nl, em, pw, pn, ro):
        self.name_first = nf
        self.name_last = nl
        self.email = em
        self.password = pw
        self.phone_number = pn
        self.role = ro
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for Sys_user"""
        
        # add bootrap entries
        database.session.add(Sys_user(
            "Order",
            "Taker",
            "ot@cds.com",
            "ot1234",
            "1234567890",
            1))
        database.session.add(Sys_user(
            "Order",
            "Fulfiller",
            "of@cds.com",
            "of1234",
            "1234567890",
            2))
        database.session.add(Sys_user(
            "Administrator",
            "",
            "admin@cds.com",
            "root",
            "1234567890",
            3))
            
        database.session.commit()
        
        
class Shop_category(db.Model):
    """shop category database table definition"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(db.String(100), nullable=False)
    
    def __init__(self, ty):
        self.type = ty
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for Shop_category"""
        
        # add bootrap entries
        database.session.add(Shop_category(
            "Temp Category 1"))
        database.session.add(Shop_category(
            "Temp Category 2"))
            
        database.session.commit()
        
        
class Shop(db.Model):
    """shop database table definition"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=True)
    phone_number = db.Column(db.String(10), nullable=True)
    category = db.Column(db.Integer, db.ForeignKey('shop_category.id'), nullable=True)
    street = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    providence = db.Column(db.String(255), nullable=False)
    zip_4 = db.Column(db.String(10), nullable=False)
    
    def __init__(self, na, em, pn, cat, st, ci, pr, zi):
        self.name = na
        self.email = em
        self.phone_number = pn
        self.category = cat
        self.street = st
        self.city = ci
        self.providence = pr
        self.zip_4 = zi
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for Shop"""
        
        # add bootrap entries
        database.session.add(Shop(
            "Temp Store 1",
            None,
            "1234567890",
            None,
            "Street 1",
            "City 1",
            "Providence 1",
            "12345-1234"))
        database.session.add(Shop(
            "Temp Store 2",
            "ts2@store.com",
            "1234567890",
            1,
            "Street 2",
            "City 2",
            "Providence 2",
            "12345-1234"))
        database.session.add(Shop(
            "Temp Store 3",
            None,
            "1234567890",
            2,
            "Street 3",
            "City 3",
            "Providence 3",
            "12345-1234"))
            
        database.session.commit()
        
        
class Company(db.Model):
    """company database table definition"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    
    def __init__(self, na):
        self.name = na
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for company"""
        
        # add bootrap entries
        database.session.add(Company(
            "Company 1"))
        database.session.add(Company(
            "Compnay 2"))
            
        database.session.commit()
        
        
class Company_products(db.Model):
    """company products database table definition"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    company = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price_buy = db.Column(db.Numeric(10, 2), nullable=False)
    sell_price = db.Column(db.Numeric(10, 2), nullable=False)
    units_per_price = db.Column(db.Integer, nullable=False) 
    description = db.Column(db.String(255), nullable=True)
    
    def __init__(self, co, na, bp, sp, upp, de):
        self.company = co
        self.name = na
        self.price_buy = bp
        self.sell_price = sp
        self.units_per_price = upp
        self.description = de
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for company products"""
        
        # add bootrap entries
        database.session.add(Company_products(
            1,
            "C1 Item 1",
            1.00,
            2.00,
            1,
            None))
        database.session.add(Company_products(
            1,
            "C1 Item 2",
            2.00,
            4.00,
            2,
            "Item 2!"))
        database.session.add(Company_products(
            1,
            "C1 Item 3",
            300.00,
            600.00,
            30,
            "Big Item 3"))
        database.session.add(Company_products(
            1,
            "C1 Item 4",
            44.00,
            88.00,
            4,
            None))
            
        database.session.add(Company_products(
            2,
            "C2 Item 1",
            100.00,
            200.00,
            1,
            "Big Item"))
        database.session.add(Company_products(
            2,
            "C2 Item 2",
            0.01,
            0.02,
            1,
            "Small Item"))
        database.session.add(Company_products(
            2,
            "C2 Item 3",
            10000.00,
            20000.00,
            1,
            "Huge Item"))
        database.session.add(Company_products(
            2,
            "C2 Item 4",
            4.44,
            8.88,
            1,
            None))
            
        database.session.commit()
    
        
def database_bootstrap(database):
    Sys_user_role.bootstrap_populate(database)
    Sys_user.bootstrap_populate(database)
    Shop_category.bootstrap_populate(database)
    Shop.bootstrap_populate(database)
    Company.bootstrap_populate(database)
    Company_products.bootstrap_populate(database)
