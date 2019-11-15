import sqlite3

def initialize(connection):
    connection.execute('''CREATE TABLE users (user test, password test)''')

initialize(sqlite3.connect('scs2019.db'))