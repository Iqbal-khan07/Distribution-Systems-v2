import sys
sys.path.insert(1, '/home/ec2-user/environment/Distribution-System-CS490/backend')
import sql_related
import unittest
import json_mock
from unittest.mock import MagicMock, patch
import flask
import flask_sqlalchemy
import datetime
import json

class testcases_sql_tables(unittest.TestCase):
    def setUp(self):
        self.result_sys_user_role = {
            "id": None,
            "name": "test"
        }
        self.result_sys_user = {
            'id': None, 
            'name_first': 'first', 
            'name_last': 'last', 
            'sys_username': 'username', 
            'email_google': 'google', 
            'email_fb': 'facebook', 
            'phone_number': '1234567890'
        }
        self.result_zone = {
            "id": None,
            "name": "test"
        }
        self.result_shop_category = {
            "id": None,
            "type": "test"
        }
        self.result_shop = {
            'id': None,
            'name': 'Temp Store 1',
            'email': None,
            'phone_number': '1234567890',
            'category': None,
            'zones': [],
            'street': 'Street 1',
            'city': 'City 1',
            'providence': 'Providence 1',
            'zip_4': '12345-1234'
        }
        self.result_company = {
            'id': None, 
            'name': 'test', 
            'zones': []
        }
        self.result_company_product = {
            'id': None, 
            'name': 'C1 Item 1',
            'price_buy': 1.0,
            'price_sell': 2.0,
            'units_per_price': 1,
            'price_sell_per_unit': 2.0,
            'description': None
        }
        self.result_shop_order = {
            'id': None,
            'price_due': 40614.0,
            'price_paid': True,
            'date_delivered': None,
            'order_fulfiller': None,
            'completed': False,
            'shop_order_items': []}
            
        self.result_shop_order_item = {
            'quantity_units': 6
        }

    def test_sys_user_role_info(self):
        sys_user_role = sql_related.Sys_user_role("test")
        info = sys_user_role.request_sys_user_role_info()
        self.assertDictEqual(self.result_sys_user_role, info)

    def test_sys_user_info(self):
        session = MagicMock()
        
        sys_user = sql_related.Sys_user(
            "first",
            "last",
            "username",
            "password",
            "google",
            "facebook",
            "1234567890",
            1)
        
        info = sys_user.request_sys_user_info(session)
        self.assertEqual(self.result_sys_user['id'], info['id'])
        self.assertEqual(self.result_sys_user['name_first'], info['name_first'])
        self.assertEqual(self.result_sys_user['name_last'], info['name_last'])
        self.assertEqual(self.result_sys_user['sys_username'], info['sys_username'])
        self.assertEqual(self.result_sys_user['email_google'], info['email_google'])
        self.assertEqual(self.result_sys_user['email_fb'], info['email_fb'])
        self.assertEqual(self.result_sys_user['phone_number'], info['phone_number'])

    def test_zone_info(self):
        zone = sql_related.Zone("test")
        info = zone.request_zone_info()
        self.assertDictEqual(self.result_zone, info)

    def test_shop_category(self):
        shop_category = sql_related.Shop_category("test")
        info = shop_category.request_category_info()
        self.assertDictEqual(self.result_shop_category, info)

    def test_shop_info(self):
        session = MagicMock()
        
        shop = sql_related.Shop(
            "Temp Store 1",
            None,
            "1234567890",
            None,
            "Street 1",
            "City 1",
            "Providence 1",
            "12345-1234")
        
        info = shop.request_shop_info(session)
        self.assertDictEqual(self.result_shop, info)
        
    def test_shop_zone_info(self):
        session = MagicMock()
        shop_zone = sql_related.Shop_zone(1, 1)
        info = shop_zone.request_zone_info(session)
        
    def test_company_info(self):
        session = MagicMock()
        company = sql_related.Company("test")
        info = company.request_company_info(session)
        
        self.assertDictEqual(self.result_company, info)
        
    def test_company_zone_info(self):
        session = MagicMock()
        company_zone = sql_related.Company_zone(1, 1)
        info = company_zone.request_zone_info(session)

    def test_company_product_info(self):
        session = MagicMock()
        company_product = sql_related.Company_product(
            1,
            "C1 Item 1",
            1.00,
            2.00,
            1,
            None)
            
        info = company_product.request_company_product_info(session)
        
        self.assertEqual(self.result_company_product['id'], info['id'])
        self.assertEqual(self.result_company_product['name'], info['name'])
        self.assertEqual(self.result_company_product['price_buy'], info['price_buy'])
        self.assertEqual(self.result_company_product['price_sell'], info['price_sell'])
        self.assertEqual(self.result_company_product['units_per_price'], info['units_per_price'])
        self.assertEqual(self.result_company_product['price_sell_per_unit'], info['price_sell_per_unit'])
        self.assertEqual(self.result_company_product['description'], info['description'])

    def test_shop_order_info(self):
        session = MagicMock()
        
        current_time_utc = datetime.datetime.now(datetime.timezone.utc)
        week_forward = current_time_utc + datetime.timedelta(days=7)
        
        shop_order = sql_related.Shop_order(
            1,
            40614.00,
            True,
            current_time_utc,
            week_forward,
            None,
            1,
            None,
            False)
            
        info = shop_order.request_shop_order(session)
        
        self.assertEqual(self.result_shop_order['id'], info['id'])
        self.assertEqual(self.result_shop_order['price_due'], info['price_due'])
        self.assertEqual(self.result_shop_order['date_delivered'], info['date_delivered'])
        self.assertEqual(self.result_shop_order['order_fulfiller'], info['order_fulfiller'])
        self.assertEqual(self.result_shop_order['completed'], info['completed'])
        self.assertEqual(self.result_shop_order['shop_order_items'], info['shop_order_items'])
        session = MagicMock()
        
        shop_order_item = sql_related.Shop_order_item(
            1,
            2,
            6)
            
        info = shop_order_item.request_shop_order_item_info(session)
        
        self.assertEqual(self.result_shop_order_item['quantity_units'], info['quantity_units'])

    def test_bootstraps(self):
        session = MagicMock()
        sql_related.database_bootstrap(session)
        
    def test_authenticate_default(self):
        session = MagicMock()
        sql_related.authenticate_default(session, json.loads(json_mock.authenticate_default()))
        
    def test_authenticate_email(self):
        session = MagicMock()
        sql_related.authenticate_email(session, json.loads(json_mock.authenticate_email_google()), True)
        sql_related.authenticate_email(session, json.loads(json_mock.authenticate_email_facebook()), False)
        
    def test_request_company_product(self):
        session = MagicMock()
        sql_related.request_company_product(session)
        
    def test_request_shop_order_not_delivered(self):
        session = MagicMock()
        sql_related.request_shop_order_not_delivered(session)
        
    def test_request_shop(self):
        session = MagicMock()
        sql_related.request_shop(session)
        
    def test_request_zone(self):
        session = MagicMock()
        sql_related.request_zone(session)
        
    def test_request_shop_category(self):
        session = MagicMock()
        sql_related.request_shop_category(session)
        
    def test_create_shop(self):
        session = MagicMock()
        sql_related.create_shop(session, json.loads(json_mock.create_shop()))
        
    def test_create_zone(self):
        session = MagicMock()
        sql_related.create_zone(session, json.loads(json_mock.create_zone()))
        
    def test_create_shop_category(self):
        session = MagicMock()
        sql_related.create_shop_category(session, json.loads(json_mock.create_shop_category()))
        
    def test_create_shop_order(self):
        session = MagicMock()
        sql_related.create_shop_order(session, json.loads(json_mock.create_shop_order()))
        
    def test_update_shop_order_delivered(self):
        session = MagicMock()
        sql_related.update_shop_order_delivered(session, json.loads(json_mock.update_shop_order_delivered()))


if __name__ == '__main__':
    unittest.main()