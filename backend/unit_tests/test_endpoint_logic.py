"""
test_sql_tables.py: unit test file for sql_tables.py
"""


import sys
import datetime
import json
import json_mock
import flask
import flask_sqlalchemy
import unittest
from unittest.mock import MagicMock, patch


sys.path.insert(1, '/home/ec2-user/environment/Distribution-System-CS490/backend')
import endpoint_logic
import json_mock


class testcases_sql_tables(unittest.TestCase):
    def test_authenticate_default(self):
        session = MagicMock()


        endpoint_logic.authenticate_default(session, json.loads(json_mock.authenticate_default()))


    def test_authenticate_email(self):
        session = MagicMock()

        endpoint_logic.authenticate_email(session, json.loads(json_mock.authenticate_email_google()), True)
        endpoint_logic.authenticate_email(session, json.loads(json_mock.authenticate_email_facebook()), False)


    def test_request_company_product(self):
        session = MagicMock()

        endpoint_logic.request_company_product(session)


    def test_request_shop_order_not_delivered(self):
        session = MagicMock()

        endpoint_logic.request_shop_order_not_delivered(session)


    def test_request_shop_order_today(self):
        session = MagicMock()

        endpoint_logic.request_shop_order_today(session)


    def test_request_shop(self):
        session = MagicMock()

        endpoint_logic.request_shop(session)


    def test_request_zone(self):
        session = MagicMock()

        endpoint_logic.request_zone(session)


    def test_request_shop_category(self):
        session = MagicMock()

        endpoint_logic.request_shop_category(session)


    def test_request_sys_user(self):
        session = MagicMock()

        endpoint_logic.request_sys_user(session)


    def test_request_sys_user_role(self):
        session = MagicMock()

        endpoint_logic.request_sys_user_role(session)


    def test_request_company(self):
        session = MagicMock()

        endpoint_logic.request_company(session)


    def test_create_shop(self):
        session = MagicMock()

        endpoint_logic.create_shop(session, json.loads(json_mock.create_shop()))


    def test_create_zone(self):
        session = MagicMock()

        endpoint_logic.create_zone(session, json.loads(json_mock.create_zone()))


    def test_create_shop_category(self):
        session = MagicMock()

        endpoint_logic.create_shop_category(session, json.loads(json_mock.create_shop_category()))


    def test_create_shop_order(self):
        session = MagicMock()

        endpoint_logic.create_shop_order(session, json.loads(json_mock.create_shop_order()))


    def test_create_user(self):
        session = MagicMock()

        endpoint_logic.create_user(session, json.loads(json_mock.create_user()))


    def test_create_company_product(self):
        session = MagicMock()

        endpoint_logic.create_company_product(session, json.loads(json_mock.create_company_product()))


    def test_create_company(self):
        session = MagicMock()

        endpoint_logic.create_company(session, json.loads(json_mock.create_company()))


    def test_update_shop_order_delivered(self):
        session = MagicMock()

        endpoint_logic.update_shop_order_delivered(session, json.loads(json_mock.update_shop_order_delivered()))


    def test_goal_order_taker(self):
        session = MagicMock()

        endpoint_logic.goal_order_taker(session, json.loads(json_mock.goal_order_taker()))


    def test_goal_order_taker_new(self):
        session = MagicMock()

        endpoint_logic.goal_order_taker_new(session, json.loads(json_mock.goal_order_taker_new()))


    def test_inventory_update(self):
        session = MagicMock()

        endpoint_logic.inventory_update(session, json.loads(json_mock.inventory_update()))


if __name__ == '__main__':
    unittest.main()