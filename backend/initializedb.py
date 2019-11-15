import sqlite3

def initialize(connection):
    connection.execute('''CREATE TABLE users (id INTEGER PRIMARY KEY, user text, password text)''')

    connection.execute('''CREATE TABLE questions (id INTEGER PRIMARY KEY, question text, answer text, mc1 text, mc2 text, mc3 text, mc4 text)''')

    connection.execute('''CREATE TABLE quiz_attempts (user text, score int)''')

    connection.execute('''INSERT INTO questions (question, answer, mc1, mc2, mc3, mc4) VALUES ("kmn", "yes", "yes", "no", "maybe", "ok")''')

    connection.execute('''INSERT INTO questions (question, answer, mc1, mc2, mc3, mc4) VALUES ("Who's back", "Bees", "Bees", "Birds", "Lions", "Wasps")''')

    connection.commit()
    connection.close()

initialize(sqlite3.connect('scs2019.db'))