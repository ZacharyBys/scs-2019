import os
import unittest
import sqlite3
from app import app
from initializedb import initialize
 
TEST_DB = 'test_scs2019.db'
 
class Tests(unittest.TestCase):
 
    def setUp(self):
        try:
            os.remove(TEST_DB)
        except OSError:
            pass

        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        app.config['DEBUG'] = False
        app.config['DB_NAME'] = TEST_DB
        initialize(sqlite3.connect(TEST_DB))
        self.app = app.test_client()
 
    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        print(response)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode("utf-8") , "Hello World!")
 
 
if __name__ == "__main__":
    unittest.main()