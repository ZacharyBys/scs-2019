import os
import unittest
import sqlite3
from app import app
from initializedb import initialize
from flask import jsonify
import json
 
TEST_DB = 'test_scs2019.db'
 
class Tests(unittest.TestCase):
 
    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        app.config['DEBUG'] = False
        app.config['DB_NAME'] = TEST_DB
        app.testing = True
        initialize(sqlite3.connect(TEST_DB))
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()
 
    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode("utf-8") , "Hello World!")

    def test_create_user_and_login(self):
        user_name = "zach"
        password = "password123"
        body = {"user": user_name, "password": password}
        response = self.app.put('/user', data=json.dumps(body), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = self.app.post('/login', data=json.dumps(body), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode("utf-8"), "OK")

    def tearDown(self):
        os.remove(TEST_DB)
        self.app_context.pop()
 
 
if __name__ == "__main__":
    unittest.main()