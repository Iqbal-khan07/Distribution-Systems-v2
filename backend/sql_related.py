"""sql_related.py: all SQL interface functions and table definitions"""

import flask_sqlalchemy
import datetime
from backend_main import db


class Sys_user_role(db.Model):
    """system user role database table definition
    Stores roles for sys_user
    1 = Order Taker
    2 = Order Fulfiller
    3 = Administrator"""
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    
    def __init__(self, na):
        self.name = na
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for Sys_user_role"""
        
        database.session.add(Sys_user_role(
            "Order Taker"))
        database.session.add(Sys_user_role(
            "Order Fulfiller"))
        database.session.add(Sys_user_role(
            "Administrator"))
            
        database.session.commit()


class Sys_user(db.Model):
    """sys_user database table definition
    Stores all employee / system user information"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name_first = db.Column(db.String(50), nullable=False)
    name_last = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    # Note, password is currently plain text. In the future,
    # make this a hash with a salt, make salt another field
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
        """database bootstrap function for sys_user"""
        
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
        
        
class Zone(db.Model):
    """zone database table definition
    Zones are assigned to companyies and shops"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    
    def __init__(self, na):
        self.name = na
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for zone"""
        
        database.session.add(Zone(
            "Temp Zone 1"))
        database.session.add(Zone(
            "Temp Zone 2"))
        database.session.add(Zone(
            "Temp Zone 3"))
        database.session.add(Zone(
            "Temp Zone 4"))
            
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
        """database bootstrap function for shop"""
        
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
        
        
class Shop_zone(db.Model):
    """shop_zone database table definition"""
    shop = db.Column(db.Integer, db.ForeignKey('shop.id'), primary_key=True, nullable=False)
    zone = db.Column(db.Integer, db.ForeignKey('zone.id'), primary_key=True, nullable=False)
    
    def __init__(self, sh, zo):
        self.shop = sh
        self.zone = zo
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for shop_zone"""
        
        database.session.add(Shop_zone(
            1,
            1))
        database.session.add(Shop_zone(
            1,
            4))
            
        database.session.add(Shop_zone(
            2,
            3))
            
        database.session.add(Shop_zone(
            3,
            1))
        database.session.add(Shop_zone(
            3,
            2))
        database.session.add(Shop_zone(
            3,
            3))
        database.session.add(Shop_zone(
            3,
            4))
            
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
        
        database.session.add(Company(
            "Company 1"))
        database.session.add(Company(
            "Compnay 2"))
            
        database.session.commit()

        
class Company_zone(db.Model):
    """company_zone database table definition"""
    company = db.Column(db.Integer, db.ForeignKey('company.id'), primary_key=True, nullable=False)
    zone = db.Column(db.Integer, db.ForeignKey('zone.id'), primary_key=True, nullable=False)
    
    def __init__(self, co, zo):
        self.company = co
        self.zone = zo
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for company_zone"""
        
        database.session.add(Company_zone(
            1,
            2))
        database.session.add(Company_zone(
            1,
            3))
            
        database.session.add(Company_zone(
            2,
            1))
        database.session.add(Company_zone(
            2,
            4))
            
        database.session.commit()
        
        
class Company_product(db.Model):
    """company_product database table definition"""
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
        """database bootstrap function for company_product"""
        
        database.session.add(Company_product(
            1,
            "C1 Item 1",
            1.00,
            2.00,
            1,
            None))
        database.session.add(Company_product(
            1,
            "C1 Item 2",
            2.00,
            4.00,
            2,
            "Item 2!"))
        database.session.add(Company_product(
            1,
            "C1 Item 3",
            300.00,
            600.00,
            30,
            "Big Item 3"))
        database.session.add(Company_product(
            1,
            "C1 Item 4",
            44.00,
            88.00,
            4,
            None))
            
        database.session.add(Company_product(
            2,
            "C2 Item 1",
            100.00,
            200.00,
            1,
            "Big Item"))
        database.session.add(Company_product(
            2,
            "C2 Item 2",
            0.01,
            0.02,
            1,
            "Small Item"))
        database.session.add(Company_product(
            2,
            "C2 Item 3",
            10000.00,
            20000.00,
            1,
            "Huge Item"))
        database.session.add(Company_product(
            2,
            "C2 Item 4",
            4.44,
            8.88,
            1,
            None))
            
        database.session.commit()
        
        
class Shop_order(db.Model):
    """shop_order database table definition"""
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    shop = db.Column(db.Integer, db.ForeignKey('shop.id'), nullable=False)
    price_due = db.Column(db.Numeric(10, 2), nullable=False)
    price_paid = db.Column(db.Boolean(), nullable=False)
    date_ordered = db.Column(db.DateTime(True), nullable=False)
    date_delivered_projected = db.Column(db.DateTime(True), nullable=False)
    date_delivered = db.Column(db.DateTime(True), nullable=True)
    order_taker = db.Column(db.Integer, db.ForeignKey('sys_user.id'), nullable=False)
    order_fulfiller = db.Column(db.Integer, db.ForeignKey('sys_user.id'), nullable=True)
    completed = db.Column(db.Boolean(), nullable=False)
    
    def __init__(self, sh, pd, pp, do, ddp, dd, ot, of, co):
        self.shop = sh
        self.price_due = pd
        self.price_paid = pp
        self.date_ordered = do
        self.date_delivered_projected = ddp
        self.date_delivered = dd
        self.order_taker = ot
        self.order_fulfiller = of
        self.completed = co
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for shop_order"""
        current_time_utc = datetime.datetime.now(datetime.timezone.utc)
        # one week ahead for projected delivery date
        week_forward = current_time_utc + datetime.timedelta(days=7)
        
        # order placed and paid
        database.session.add(Shop_order(
            1,
            40614.00,
            True,
            current_time_utc,
            week_forward,
            None,
            1,
            None,
            False))
        # order placed and not paid
        database.session.add(Shop_order(
            2,
            7928.00,
            False,
            current_time_utc,
            week_forward,
            None,
            1,
            None,
            False))
        # order placed, paid and delivered
        database.session.add(Shop_order(
            3,
            400400.00,
            True,
            current_time_utc,
            week_forward,
            week_forward,
            1,
            2,
            True))
            
        database.session.commit()
        
        
class Shop_order_item(db.Model):
    """shop_order_item database table definition"""
    shop_order = db.Column(db.Integer, db.ForeignKey('shop_order.id'), primary_key=True, nullable=False)
    company_product = db.Column(db.Integer, db.ForeignKey('company_product.id'), primary_key=True, nullable=False)
    quantity_units = db.Column(db.Integer, nullable=False)
    
    def __init__(self, so, cp, qu):
        self.shop_order = so
        self.company_product = cp
        self.quantity_units = qu
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for shop_order_items"""
        
        database.session.add(Shop_order_item(
            1,
            2,
            6))
        database.session.add(Shop_order_item(
            1,
            7,
            2))
        database.session.add(Shop_order_item(
            1,
            6,
            100))
        database.session.add(Shop_order_item(
            1,
            5,
            3))
            
        database.session.add(Shop_order_item(
            2,
            1,
            200))
        database.session.add(Shop_order_item(
            2,
            4,
            100))
        database.session.add(Shop_order_item(
            2,
            8,
            600))
            
        database.session.add(Shop_order_item(
            3,
            7,
            20))
        database.session.add(Shop_order_item(
            3,
            3,
            10))
        database.session.add(Shop_order_item(
            3,
            6,
            10000))
            
        database.session.commit()
    
        
def database_bootstrap(database):
    Sys_user_role.bootstrap_populate(database)
    Sys_user.bootstrap_populate(database)
    Zone.bootstrap_populate(database)
    Shop_category.bootstrap_populate(database)
    Shop.bootstrap_populate(database)
    Shop_zone.bootstrap_populate(database)
    Company.bootstrap_populate(database)
    Company_zone.bootstrap_populate(database)
    Company_product.bootstrap_populate(database)
    Shop_order.bootstrap_populate(database)
    Shop_order_item.bootstrap_populate(database)
