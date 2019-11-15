from flask import Flask, request, Response
import sqlite3

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/user', methods=["PUT"])
def create_user():
    connection = sqlite3.connect('scs2019.db')

    content = request.json
    user = content['user']
    password = content['password']

    connection.execute("INSERT INTO users (user, password) VALUES (?, ?)", (user, password))
    connection.commit()
    connection.close()
    return "OK"

@app.route('/login', methods = ['POST'])
def login():
    connection = sqlite3.connect('scs2019.db')
    cur = connection.cursor()

    content = request.json
    user = content['user']
    password = content['password']

    cur.execute("SELECT password FROM users WHERE user=?", (user,))

    fetched_password = cur.fetchone()
    connection.close()

    if fetched_password and str(fetched_password[0]) == str(password):
        return Response("OK", status=200)
    else:
        return Response("Unauthorized", status=403)


if __name__ == '__main__':
    app.run()