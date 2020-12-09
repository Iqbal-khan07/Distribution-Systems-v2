"""
sql_tables.py: all SQL table definitions and bootstrapping goes here
"""


import datetime
from backend_main import DB


class Sys_user_role(DB.Model):
    """
    system user role database table definition
    Stores roles for sys_user
    1 = Order Taker
    2 = Order Fulfiller
    3 = Administrator
    """

    id = DB.Column(DB.Integer, primary_key=True, nullable=False)
    name = DB.Column(DB.String(50), nullable=False, unique=True)

    def __init__(self, name):
        self.name = name

    def request_sys_user_role_info(self):
        """
        produces a dictionary of all relevant sys_user_role information
        """

        return {
            "id": self.id,
            "name": self.name
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for Sys_user_role
        """

        database.session.add(Sys_user_role("Order Taker"))
        database.session.add(Sys_user_role("Order Fulfiller"))
        database.session.add(Sys_user_role("Administrator"))

        database.session.commit()


class Sys_user(DB.Model):
    """
    sys_user database table definition
    Stores all employee / system user information
    """

    id = DB.Column(DB.Integer, primary_key=True, nullable=False)
    name_first = DB.Column(DB.String(50), nullable=False)
    name_last = DB.Column(DB.String(50), nullable=False)
    sys_username = DB.Column(DB.String(50), nullable=False, unique=True)
    # Note, password is currently plain text. In the future,
    # make this a hash with a salt, make salt another field
    password = DB.Column(DB.String(255), nullable=False)
    email_google = DB.Column(DB.String(100), nullable=False, unique=True)
    email_fb = DB.Column(DB.String(100), nullable=False, unique=True)
    image_url = DB.Column(DB.String(500), nullable=False)
    phone_number = DB.Column(DB.String(10), nullable=True)
    role = DB.Column(DB.Integer, DB.ForeignKey("sys_user_role.id"), nullable=False)

    def __init__(self, first, last, username, password, google, facebook, image, phone, role):
        self.name_first = first
        self.name_last = last
        self.sys_username = username
        self.password = password
        self.email_google = google
        self.email_fb = facebook
        self.image_url = image
        self.phone_number = phone
        self.role = role

    def request_sys_user_info(self, database):
        """
        produces a dictionary of all relevant sys_user information
        """

        sys_user_role = (
            database.session.query(Sys_user_role)
            .filter(Sys_user_role.id == self.role)
            .all()
        )[0].request_sys_user_role_info()

        return {
            "id": self.id,
            "name_first": self.name_first,
            "name_last": self.name_last,
            "sys_username": self.sys_username,
            "email_google": self.email_google,
            "email_fb": self.email_fb,
            "image_url": self.image_url,
            "phone_number": self.phone_number,
            "sys_user_role": sys_user_role,
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for sys_user
        """

        database.session.add(
            Sys_user(
                "Order",
                "Taker",
                "order_taker",
                "ot1234",
                "order_taker@gmail.com",
                "order_taker@other.com",
                "https://images.squarespace-cdn.com/content/v1/55ad5011e4b026cf25" +
                "25000a/1441740484174-PTHHQBWISMSJUC9OS1RX/ke17ZwdGBToddI8pDm4" +
                "8kP06O0_IHyRXSOOiqwgWaApZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAg" +
                "TJucoTqqXjS3CfNDSuuf31e0tVEHLRkg2cosQUGLeQ33UzXdgIxPDaVwE3LlE" +
                "pL74qP4JVW4jCyXLPvvdR287iymYt8/the-letter-t.jpg",
                "1234567890",
                1,
            )
        )
        database.session.add(
            Sys_user(
                "Order",
                "Fulfiller",
                "order_fulfiller",
                "of1234",
                "order_fulfiller@gmail.com",
                "order_fulfiller@other.com",
                "https://i.redd.it/o8rz4s0lxp021.png",
                "1234567890",
                2,
            )
        )
        database.session.add(
            Sys_user(
                "Administrator",
                "",
                "admin",
                "root",
                "administrator@gmail.com",
                "administrator@other.com",
                "https://lh3.googleusercontent.com/proxy/RNhuhNzPCOufEUuiXAZ6R49T" +
                "4H1qAjaXoVhXv7dZ4SDkTGXzkpFm8AsNAOxgxHgsRJGWuVa_OAM2l7iZ7YJDM" +
                "rrOe2AIi1U",
                "1234567890",
                3,
            )
        )
        database.session.add(
            Sys_user(
                "Denisse",
                "Mendoza",
                "denisse",
                "dm1234",
                "dm464@njit.edu",
                "idislexiaheart@aol.com",
                "https://i0.wp.com/thevitpro.com/wp-content/uploads/2019/07/Lette" +
                "r-D.png?fit=551%2C640&ssl=1",
                "1234567890",
                1,
            )
        )
        database.session.add(
            Sys_user(
                "Tylor",
                "Autore",
                "tylor",
                "ta1234",
                "tma26@njit.edu",
                "hellfrost@embarqmail.com",
                "https://pioneerinstitute.org/wp-content/uploads/MBTA-T-sign-e143" +
                "8701323593.png",
                "9739199865",
                2,
            )
        )
        database.session.add(
            Sys_user(
                "Abdul-Quddus",
                "Adeniji",
                "abdul",
                "aq1234",
                "aqadeniji@gmail.com",
                "abdul83@ymail.com",
                "https://lh3.googleusercontent.com/proxy/DuGp1GYoFa1QAqNutn5Ga0eWg" +
                "B2BlYJaHU5QeQpNJtSXIPOmdmBms6yPWP7F7MpUxd8kNtAqYtqMub-byZ-LJ-R" +
                "quvoun_xfE3eobkfctl0v",
                "1234567890",
                2,
            )
        )
        database.session.add(
            Sys_user(
                "Zoraiz",
                "Naeem",
                "zoraiz",
                "zn1234",
                "zoraiznaeem9@gmail.com",
                "zoraiznaeem9@gmail.com",
                "https://static6.depositphotos.com/1001599/647/i/600/depositphoto" +
                "s_6477200-stock-photo-fire-letters-a-z.jpg",
                "1234567890",
                1,
            )
        )

        database.session.commit()


class Zone(DB.Model):
    """
    zone database table definition
    Zones are assigned to companyies and shops
    """

    id = DB.Column(DB.Integer, primary_key=True, nullable=False)
    name = DB.Column(DB.String(100), nullable=False, unique=True)

    def __init__(self, name):
        self.name = name

    def request_zone_info(self):
        """
        produces a dictionary of all relevant zone information
        """

        return {
            "id": self.id,
            "name": self.name
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for zone
        """

        database.session.add(Zone("Temp Zone 1"))
        database.session.add(Zone("Temp Zone 2"))
        database.session.add(Zone("Temp Zone 3"))
        database.session.add(Zone("Temp Zone 4"))

        database.session.commit()


class Shop_category(DB.Model):
    """
    shop category database table definition
    """

    id = DB.Column(DB.Integer, primary_key=True, nullable=False)
    type = DB.Column(DB.String(100), nullable=False, unique=True)

    def __init__(self, sc_type):
        self.type = sc_type

    def request_category_info(self):
        """
        produces a dictionary of all relevant shop information
        """

        return {
            "id": self.id,
            "type": self.type
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for Shop_category
        """

        database.session.add(Shop_category("Temp Category 1"))
        database.session.add(Shop_category("Temp Category 2"))

        database.session.commit()


class Shop(DB.Model):
    """
    shop database table definition
    """

    id = DB.Column(DB.Integer, primary_key=True, nullable=False)
    name = DB.Column(DB.String(100), nullable=False)
    email = DB.Column(DB.String(100), nullable=True)
    image_url = DB.Column(DB.String(500), nullable=False)
    phone_number = DB.Column(DB.String(10), nullable=True)
    category = DB.Column(DB.Integer, DB.ForeignKey("shop_category.id"), nullable=True)
    street = DB.Column(DB.String(255), nullable=False)
    city = DB.Column(DB.String(255), nullable=False)
    providence = DB.Column(DB.String(255), nullable=False)
    zip_4 = DB.Column(DB.String(10), nullable=False)

    def __init__(self, name, email, image, phone, category, street, city, providence, zipcode):
        self.name = name
        self.email = email
        self.image_url = image
        self.phone_number = phone
        self.category = category
        self.street = street
        self.city = city
        self.providence = providence
        self.zip_4 = zipcode

    def request_shop_info(self, database):
        """
        produces a dictionary of all relevant shop information
        """

        if self.category is not None:
            shop_category_info = (
                database.session.query(Shop_category)
                .filter(Shop_category.id == self.category)
                .all()
            )[0].request_category_info()
        else:
            shop_category_info = None

        shop_zone_query = (
            database.session.query(Shop_zone).filter(Shop_zone.shop == self.id).all()
        )

        zones = []

        for zone in shop_zone_query:
            zones.append(zone.request_zone_info(database))

        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "image_url": self.image_url,
            "phone_number": self.phone_number,
            "category": shop_category_info,
            "zones": zones,
            "street": self.street,
            "city": self.city,
            "providence": self.providence,
            "zip_4": self.zip_4,
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for shop
        """

        database.session.add(
            Shop(
                "Temp Store 1",
                None,
                "https://yt3.ggpht.com/ytc/AAUvwnjLNdkBK-GXpJJQ8K9Nku_gHwS5f" +
                "WUKkq0BEoPgTA=s900-c-k-c0x00ffffff-no-rj",
                "1234567890",
                None,
                "Street 1",
                "City 1",
                "Providence 1",
                "12345-1234",
            )
        )
        database.session.add(
            Shop(
                "Temp Store 2",
                "ts2@store.com",
                "https://www.clker.com/cliparts/V/H/K/p/p/u/number-2-black-" +
                "hi.png",
                "1234567890",
                1,
                "Street 2",
                "City 2",
                "Providence 2",
                "12345-1234",
            )
        )
        database.session.add(
            Shop(
                "Temp Store 3",
                None,
                "https://blognumbers.files.wordpress.com/2010/09/3.jpg",
                "1234567890",
                2,
                "Street 3",
                "City 3",
                "Providence 3",
                "12345-1234",
            )
        )

        database.session.commit()


class Shop_zone(DB.Model):
    """
    shop_zone database table definition
    """

    shop = DB.Column(
        DB.Integer, DB.ForeignKey("shop.id"), primary_key=True, nullable=False
    )
    zone = DB.Column(
        DB.Integer, DB.ForeignKey("zone.id"), primary_key=True, nullable=False
    )

    def __init__(self, shop, zone):
        self.shop = shop
        self.zone = zone

    def request_zone_info(self, database):
        """
        produces a dictionary of all relevant zone information
        """

        zone_name = (database.session.query(Zone).filter(Zone.id == self.zone).all())[
            0
        ].name

        return {
            "id": self.zone,
            "name": zone_name
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for shop_zone
        """

        database.session.add(Shop_zone(1, 1))
        database.session.add(Shop_zone(1, 4))

        database.session.add(Shop_zone(2, 3))

        database.session.add(Shop_zone(3, 1))
        database.session.add(Shop_zone(3, 2))
        database.session.add(Shop_zone(3, 3))
        database.session.add(Shop_zone(3, 4))

        database.session.commit()


class Company(DB.Model):
    """
    company database table definition
    """

    id = DB.Column(DB.Integer, primary_key=True, nullable=False)
    name = DB.Column(DB.String(100), nullable=False, unique=True)
    image_url = DB.Column(DB.String(500), nullable=False)

    def __init__(self, name, image):
        self.name = name
        self.image_url = image

    def request_company_info(self, database):
        """
        produces a dictionary of all relevant company_product information
        """

        company_zone_query = (
            database.session.query(Company_zone)
            .filter(Company_zone.company == self.id)
            .all()
        )

        zones = []

        for zone in company_zone_query:
            zones.append(zone.request_zone_info(database))

        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "zones": zones
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for company
        """

        database.session.add(
            Company(
                "Company 1",
                "https://upload.wikimedia.org/wikipedia/commons/thum" +
                "b/3/3f/NYCS-bull-trans-1.svg/1024px-NYCS-bull-tr" +
                "ans-1.svg.png"
            )
        )
        database.session.add(
            Company(
                "Company 2",
                "https://upload.wikimedia.org/wikipedia/commons/thum" +
                "b/6/61/NYCS-bull-trans-2.svg/1200px-NYCS-bull-tr" +
                "ans-\2.svg.png"
            )
        )

        database.session.commit()


class Company_zone(DB.Model):
    """
    company_zone database table definition
    """

    company = DB.Column(
        DB.Integer, DB.ForeignKey("company.id"), primary_key=True, nullable=False
    )
    zone = DB.Column(
        DB.Integer, DB.ForeignKey("zone.id"), primary_key=True, nullable=False
    )

    def __init__(self, company, zone):
        self.company = company
        self.zone = zone

    def request_zone_info(self, database):
        """
        produces a dictionary of all relevant zone information
        """

        zone_name = (database.session.query(Zone).filter(Zone.id == self.zone).all())[
            0
        ].name

        return {
            "id": self.zone,
            "name": zone_name
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for company_zone
        """

        database.session.add(Company_zone(1, 2))
        database.session.add(Company_zone(1, 3))

        database.session.add(Company_zone(2, 1))
        database.session.add(Company_zone(2, 4))

        database.session.commit()


class Company_product(DB.Model):
    """
    company_product database table definition
    """

    id = DB.Column(DB.Integer, primary_key=True, nullable=False)
    company = DB.Column(DB.Integer, DB.ForeignKey("company.id"), nullable=False)
    name = DB.Column(DB.String(100), nullable=False)
    price_buy = DB.Column(DB.Numeric(10, 2), nullable=False)
    price_sell = DB.Column(DB.Numeric(10, 2), nullable=False)
    units_per_price = DB.Column(DB.Integer, nullable=False)
    stock = DB.Column(DB.Integer, nullable=False)
    image_url = DB.Column(DB.String(500), nullable=False)
    description = DB.Column(DB.String(255), nullable=True)

    def __init__(self, company, name, buy, sell, unit, stock, image, description):
        self.company = company
        self.name = name
        self.price_buy = buy
        self.price_sell = sell
        self.units_per_price = unit
        self.stock = stock
        self.image_url = image
        self.description = description

    def request_company_product_info(self, database):
        """
        produces a dictionary of all relevant company_product information
        """

        company = (
            database.session.query(Company).filter(Company.id == self.company).all()
        )[0].request_company_info(database)

        return {
            "id": self.id,
            "company": company,
            "name": self.name,
            "price_buy": float(self.price_buy),
            "price_sell": float(self.price_sell),
            "units_per_price": self.units_per_price,
            "price_sell_per_unit": float(self.price_sell / self.units_per_price),
            "stock": self.stock,
            "image_url": self.image_url,
            "description": self.description
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for company_product
        """

        database.session.add(
            Company_product(
                1,
                "C1 Item 1",
                1.00,
                2.00,
                1,
                10,
                "https://www.kindpng.com/picc/m/11-112771_1-number-" +
                "circle-desgin-png-1-2-3.png",
                None
            )
        )
        database.session.add(
            Company_product(
                1,
                "C1 Item 2",
                2.00,
                4.00,
                2,
                12,
                "https://cdn.picpng.com/2/photo-2-35361.png",
                "Item 2!"
            )
        )
        database.session.add(
            Company_product(
                1,
                "C1 Item 3",
                300.00,
                600.00,
                30,
                33,
                "https://blognumbers.files.wordpress.com/2010/09/3.jpg",
                "Big Item 3"
            )
        )
        database.session.add(
            Company_product(
                1,
                "C1 Item 4",
                44.00,
                88.00,
                4,
                100,
                "https://blognumbers.files.wordpress.com/2010/09/4.jpg",
                None
            )
        )

        database.session.add(
            Company_product(
                2,
                "C2 Item 1",
                100.00,
                200.00,
                1,
                22,
                "https://www.kindpng.com/picc/m/11-112771_1-number-" +
                "circle-desgin-png-1-2-3.png",
                "Big Item"
            )
        )
        database.session.add(
            Company_product(
                2,
                "C2 Item 2",
                0.01,
                0.02,
                1,
                33,
                "https://cdn.picpng.com/2/photo-2-35361.png",
                "Small Item"
            )
        )
        database.session.add(
            Company_product(
                2,
                "C2 Item 3",
                10000.00,
                20000.00,
                1,
                5,
                "https://blognumbers.files.wordpress.com/2010/09/3.jpg",
                "Huge Item"
            )
        )
        database.session.add(
            Company_product(
                2,
                "C2 Item 4",
                4.44,
                8.88,
                1,
                400,
                "https://blognumbers.files.wordpress.com/2010/09/4.jpg",
                None
            )
        )

        database.session.commit()


class Shop_order(DB.Model):
    """
    shop_order database table definition
    """

    id = DB.Column(DB.Integer, primary_key=True, nullable=False)
    shop = DB.Column(DB.Integer, DB.ForeignKey("shop.id"), nullable=False)
    price_due = DB.Column(DB.Numeric(10, 2), nullable=False)
    price_paid = DB.Column(DB.Boolean(), nullable=False)
    memo = DB.Column(DB.String(500), nullable=False)
    date_ordered = DB.Column(DB.DateTime(True), nullable=False)
    date_delivered_projected = DB.Column(DB.DateTime(True), nullable=False)
    date_delivered = DB.Column(DB.DateTime(True), nullable=True)
    order_taker = DB.Column(DB.Integer, DB.ForeignKey("sys_user.id"), nullable=False)
    order_fulfiller = DB.Column(DB.Integer, DB.ForeignKey("sys_user.id"), nullable=True)
    completed = DB.Column(DB.Boolean(), nullable=False)

    def __init__(self, shop, due, paid, memo, ordered, projected,
                 delivered, taker, fulfiller, completed):
        self.shop = shop
        self.price_due = due
        self.price_paid = paid
        self.memo = memo
        self.date_ordered = ordered
        self.date_delivered_projected = projected
        self.date_delivered = delivered
        self.order_taker = taker
        self.order_fulfiller = fulfiller
        self.completed = completed

    def request_shop_order(self, database):
        """
        produces a dictionary of all relevant shop_order information
        """

        shop_entry = (database.session.query(Shop).filter(Shop.id == self.shop).all())[
            0
        ]

        order_taker = (
            database.session.query(Sys_user)
            .filter(Sys_user.id == self.order_taker)
            .all()
        )[0].request_sys_user_info(database)

        if self.order_fulfiller is not None:
            order_fulfiller = (
                database.session.query(Sys_user)
                .filter(Sys_user.id == self.order_fulfiller)
                .all()
            )[0].request_sys_user_info(database)
        else:
            order_fulfiller = None

        shop_order_items_query = (
            database.session.query(Shop_order_item)
            .filter(Shop_order_item.shop_order == self.id)
            .all()
        )

        shop_order_items = []

        for entry in shop_order_items_query:
            shop_order_items.append(entry.request_shop_order_item_info(database))

        return {
            "id": self.id,
            "shop": shop_entry.request_shop_info(database),
            "price_due": float(self.price_due),
            "price_paid": self.price_paid,
            "memo": self.memo,
            "date_ordered": str(self.date_ordered),
            "date_delivered_projected": str(self.date_delivered_projected),
            "date_delivered": self.date_delivered,
            "order_taker": order_taker,
            "order_fulfiller": order_fulfiller,
            "completed": self.completed,
            "shop_order_items": shop_order_items,
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for shop_order
        """

        current_time_utc = datetime.datetime.now(datetime.timezone.utc)
        # one week ahead for projected delivery date
        week_forward = current_time_utc + datetime.timedelta(days=7)

        # order placed and paid
        database.session.add(
            Shop_order(
                1,
                40614.00,
                True,
                "test 1",
                current_time_utc,
                week_forward,
                None,
                1,
                None,
                False
            )
        )
        # order placed and not paid
        database.session.add(
            Shop_order(
                2,
                7928.00,
                False,
                "test 2",
                current_time_utc,
                week_forward,
                None,
                1,
                None,
                False
            )
        )
        # order placed, paid and delivered
        database.session.add(
            Shop_order(
                3,
                400400.00,
                True,
                "",
                current_time_utc,
                week_forward,
                week_forward,
                1,
                2,
                True,
            )
        )

        database.session.commit()


class Shop_order_item(DB.Model):
    """
    shop_order_item database table definition
    """

    shop_order = DB.Column(
        DB.Integer, DB.ForeignKey("shop_order.id"), primary_key=True, nullable=False
    )
    company_product = DB.Column(
        DB.Integer,
        DB.ForeignKey("company_product.id"),
        primary_key=True,
        nullable=False,
    )
    quantity_units = DB.Column(DB.Integer, nullable=False)

    def __init__(self, order, company, units):
        self.shop_order = order
        self.company_product = company
        self.quantity_units = units

    def request_shop_order_item_info(self, database):
        """
        produces a dictionary of all relevant shop_order_item information
        """

        company_product = shop_order_items_query = (
            database.session.query(Company_product)
            .filter(Company_product.id == self.company_product)
            .all()[0]
            .request_company_product_info(database)
        )

        return {
            "company_product": company_product,
            "quantity_units": self.quantity_units,
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for shop_order_items
        """

        database.session.add(Shop_order_item(1, 2, 6))
        database.session.add(Shop_order_item(1, 7, 2))
        database.session.add(Shop_order_item(1, 6, 100))
        database.session.add(Shop_order_item(1, 5, 3))

        database.session.add(Shop_order_item(2, 1, 200))
        database.session.add(Shop_order_item(2, 4, 100))
        database.session.add(Shop_order_item(2, 8, 600))

        database.session.add(Shop_order_item(3, 7, 20))
        database.session.add(Shop_order_item(3, 3, 10))
        database.session.add(Shop_order_item(3, 6, 10000))

        database.session.commit()


class Order_taker_goal(DB.Model):
    """
    order_taker_goal database table definition
    """

    order_taker = DB.Column(
        DB.Integer, DB.ForeignKey("sys_user.id"), primary_key=True, nullable=False
    )
    month = DB.Column(DB.Integer, primary_key=True, nullable=False)
    year = DB.Column(DB.Integer, primary_key=True, nullable=False)
    goal_value = DB.Column(DB.Numeric(10, 2), nullable=False)

    def __init__(self, taker, month, year, value):
        self.order_taker = taker
        self.month = month
        self.year = year
        self.goal_value = value

    def request_order_taker_goal_info(self):
        """
        produces a dictionary of all relevant order_taker_goal information
        """

        return {
            "order_taker": self.order_taker,
            "month":  self.month,
            "year": self.year,
            "goal_value": self.goal_value
        }

    @staticmethod
    def bootstrap_populate(database):
        """
        database bootstrap function for order_taker_goal
        """

        database.session.add(Order_taker_goal(1, 11, 2020, 20000.00))
        database.session.add(Order_taker_goal(1, 12, 2020, 15000.00))
        database.session.add(Order_taker_goal(4, 11, 2020, 10000.00))
        database.session.add(Order_taker_goal(4, 12, 2020, 11000.00))
        database.session.add(Order_taker_goal(7, 11, 2020, 12000.00))
        database.session.add(Order_taker_goal(7, 12, 2020, 13000.00))

        database.session.commit()


def database_bootstrap(database):
    """
    this function populates all tables with mock testing data
    """

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
    Order_taker_goal.bootstrap_populate(database)

    database.session.close()
