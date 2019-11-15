import sqlite3

def initialize(connection):
    connection.execute('''CREATE TABLE users (id INTEGER PRIMARY KEY, user text, password text)''')

    connection.execute('''CREATE TABLE questions (id INTEGER PRIMARY KEY, question text, answer text, mc1 text, mc2 text, mc3 text, mc4 text)''')

initialize(sqlite3.connect('scs2019.db'))