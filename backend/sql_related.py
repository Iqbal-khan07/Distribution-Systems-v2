"""sql_related.py: all SQL interface functions and table definitions"""

import flask_sqlalchemy
import datetime
import json
from flask import jsonify
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
        
    def request_sys_user_role_info(self):
        """produces a dictionary of all relevant sys_user_role information"""
        
        return \
        {
            "id": self.id,
            "name": self.name
        }
        
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
    sys_username = db.Column(db.String(50), nullable=False, unique=True)
    # Note, password is currently plain text. In the future,
    # make this a hash with a salt, make salt another field
    password = db.Column(db.String(255), nullable=False)
    email_google = db.Column(db.String(100), nullable=False, unique=True)
    email_fb = db.Column(db.String(100), nullable=False, unique=True)
    phone_number = db.Column(db.String(10), nullable=True)
    role = db.Column(db.Integer, db.ForeignKey('sys_user_role.id'), nullable=False)
    
    def __init__(self, nf, nl, su, pw, eg, ef, pn, ro):
        self.name_first = nf
        self.name_last = nl
        self.sys_username = su
        self.password = pw
        self.email_google = eg
        self.email_fb = ef
        self.phone_number = pn
        self.role = ro
        
    def request_sys_user_info(self, database):
        """produces a dictionary of all relevant sys_user information"""
        
        sys_user_role = (database.session.query(Sys_user_role).filter(
            Sys_user_role.id == self.role).all())[0].request_sys_user_role_info()
        
        return \
        {
            "id": self.id,
            "name_first": self.name_first,
            "name_last": self.name_last,
            "sys_username": self.sys_username,
            "email_google": self.email_google,
            "email_fb": self.email_fb,
            "phone_number": self.phone_number,
            "sys_user_role": sys_user_role
        }
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for sys_user"""
        
        database.session.add(Sys_user(
            "Order",
            "Taker",
            "order_taker",
            "ot1234",
            "order_taker@gmail.com",
            "order_taker@other.com",
            "1234567890",
            1))
        database.session.add(Sys_user(
            "Order",
            "Fulfiller",
            "order_fulfiller",
            "of1234",
            "order_fulfiller@gmail.com",
            "order_fulfiller@other.com",
            "1234567890",
            2))
        database.session.add(Sys_user(
            "Administrator",
            "",
            "admin",
            "root",
            "administrator@gmail.com",
            "administrator@other.com",
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
        
    def request_category_info(self):
        """produces a dictionary of all relevant shop information"""
        
        return \
        {
            "id": self.id,
            "type": self.type
        }
        
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
        
    def request_shop_info(self, database):
        """produces a dictionary of all relevant shop information"""
        
        if self.category != None:
            shop_category_info = (database.session.query(Shop_category).filter(
                Shop_category.id == self.category).all())[0].request_category_info()
        else:
            shop_category_info = None
            
        shop_zone_query = database.session.query(Shop_zone).filter(
                Shop_zone.shop == self.id).all()
                
        zones = []
        
        for zone in shop_zone_query:
            zones.append(zone.request_zone_info(database))
        
        return \
        {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone_number": self.phone_number,
            "category": shop_category_info,
            "zones": zones,
            "street": self.street,
            "city": self.city,
            "providence": self.providence,
            "zip_4": self.zip_4
        }
        
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
        
    def request_zone_info(self, database):
        """produces a dictionary of all relevant zone information"""
        
        zone_name = (database.session.query(Zone).filter(
            Zone.id == self.zone).all())[0].name
            
        return \
        {
            "id": self.zone,
            "name": zone_name
        }
        
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
        
    def request_company_info(self, database):
        """produces a dictionary of all relevant company_product information"""
        
        company_zone_query = database.session.query(Company_zone).filter(
                Company_zone.company == self.id).all()
                
        zones = []
        
        for zone in company_zone_query:
            zones.append(zone.request_zone_info(database))
            
        return \
        {
            "id": self.id,
            "name": self.name,
            "zones": zones
        }
        
    @staticmethod
    def bootstrap_populate(database):
        """database bootstrap function for company"""
        
        database.session.add(Company(
            "Company 1"))
        database.session.add(Company(
            "Company 2"))
            
        database.session.commit()

        
class Company_zone(db.Model):
    """company_zone database table definition"""
    
    company = db.Column(db.Integer, db.ForeignKey('company.id'), primary_key=True, nullable=False)
    zone = db.Column(db.Integer, db.ForeignKey('zone.id'), primary_key=True, nullable=False)
    
    def __init__(self, co, zo):
        self.company = co
        self.zone = zo
        
    def request_zone_info(self, database):
        """produces a dictionary of all relevant zone information"""
        
        zone_name = (database.session.query(Zone).filter(
            Zone.id == self.zone).all())[0].name
            
        return \
        {
            "id": self.zone,
            "name": zone_name
        }
        
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
    price_sell = db.Column(db.Numeric(10, 2), nullable=False)
    units_per_price = db.Column(db.Integer, nullable=False) 
    description = db.Column(db.String(255), nullable=True)
    
    def __init__(self, co, na, bp, sp, upp, de):
        self.company = co
        self.name = na
        self.price_buy = bp
        self.price_sell = sp
        self.units_per_price = upp
        self.description = de
        
    def request_company_product_info(self, database):
        """produces a dictionary of all relevant company_product information"""
        
        company = (database.session.query(Company).filter(
            Company.id == self.company).all())[0].request_company_info(database)
        
        return \
        {
            "id": self.id,
            "company": company,
            "name": self.name,
            "price_buy": format(float(self.price_buy), '.2f'),
            "price_sell": format(float(self.price_sell), '.2f'),
            "units_per_price": self.units_per_price,
            "price_sell_per_unit": format(float(self.price_sell / self.units_per_price), '.2f'),
            "description": self.description
        }
        
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
        
    def request_shop_order(self, database):
        """produces a dictionary of all relevant shop_order information"""
        
        shop_entry = (database.session.query(Shop).filter(
            Shop.id == self.shop).all())[0]
            
        order_taker = (database.session.query(Sys_user).filter(
            Sys_user.id == self.order_taker).all())[0].request_sys_user_info(database)
            
        if self.order_fulfiller != None:
            order_fulfiller = (database.session.query(Sys_user).filter(
            Sys_user.id == self.order_fulfiller).all())[0].request_sys_user_info(database)
        else:
            order_fulfiller = None
            
        shop_order_items_query = database.session.query(Shop_order_item).filter(
            Shop_order_item.shop_order == self.id).all()
            
        shop_order_items = []
        
        for entry in shop_order_items_query:
            shop_order_items.append(entry.request_shop_order_item_info(database))
        
        return \
        {
            "id": self.id,
            "shop": shop_entry.request_shop_info(database),
            "price_due": format(float(self.price_due), '.2f'),
            "price_paid": self.price_paid,
            "date_ordered": str(self.date_ordered),
            "date_delivered_projected": str(self.date_delivered_projected),
            "date_delivered": self.date_delivered,
            "order_taker": order_taker,
            "order_fulfiller": order_fulfiller,
            "completed": self.completed,
            "shop_order_items": shop_order_items
        }
        
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
        
    def request_shop_order_item_info(self, database):
        """produces a dictionary of all relevant shop_order_item information"""
        
        company_product = shop_order_items_query = database.session.query(Company_product).filter(
            Company_product.id == self.company_product).all()[0].request_company_product_info(database)
        
        return \
        {
            "company_product": company_product,
            "quantity_units": self.quantity_units
        }
        
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

# database queries for HTTP requests    
def authenticate_default(database, data):
    """this function authenticates a user based upon sys_username 
    and password by checking passed parameters against the database"""
    
    data_loaded = json.loads(data)
        
    username_login = data_loaded["authenticate_default"]["username"]
    password_login = data_loaded["authenticate_default"]["password"]
    
    query_result = database.session.query(Sys_user).filter(
        Sys_user.sys_username == username_login, Sys_user.password \
        == password_login).all()
    
    if query_result:
        response_inner = query_result[0].request_sys_user_info(database)
    else:
        response_inner = "invalid login credentials"
        
    response = {
            "authenticate_default_response": response_inner
        }
        
    return json.dumps(response, indent = 4)
    
def authenticate_email(database, data, google):
    """this function authenticates a user based upon an email address 
    if google = True, this is a google login
    if google = False, this is a Facebook login"""
    
    data_loaded = json.loads(data)
    
    email_login = data_loaded["authenticate_email"]["email"]
    
    if google:
        query_result = database.session.query(Sys_user).filter(
            Sys_user.email_google == email_login).all()
    else:
        query_result = database.session.query(Sys_user).filter(
            Sys_user.email_fb == email_login).all()
    
    if query_result:
        response_inner = query_result[0].request_sys_user_info(database)
    else:
        response_inner = "invalid login credentials"
        
    response = {
            "authenticate_email_response": response_inner
        }
        
    return json.dumps(response, indent = 4)
    
def request_company_product(database):
    query_result = database.session.query(Company_product).all()
    
    result = []
    
    for item in query_result:
        result.append(item.request_company_product_info(database))
        
    response = {
            "request_company_product_response": result
        }
        
    return json.dumps(response, indent = 4)
    
def request_shop_order_not_delivered(database):
    query_result = database.session.query(Shop_order).filter(
        Shop_order.completed == False).all()
    
    result = []
    
    for item in query_result:
        result.append(item.request_shop_order(database))
        
    response = {
            "request_shop_order_not_delivered_response": result
        }
        
    return json.dumps(response, indent = 4)
