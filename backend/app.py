from flask import Flask, request, Response, jsonify
import sqlite3
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def hello():
    return "Hello World!"

@app.route('/user', methods=["PUT"])
@cross_origin()
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
@cross_origin()
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

@app.route('/questions', methods=['GET'])
@cross_origin()
def questions():
    connection = sqlite3.connect('scs2019.db')
    cur = connection.cursor()

    if request.method == "GET":
        cur.execute("SELECT * FROM questions")
        fetched = cur.fetchall()
        connection.close()

        # QUESTION = (id, question, answer, mc1, mc2, mc3, mc4)
        questions = {'questions': fetched}
        return jsonify(fetched)



if __name__ == '__main__':
    app.run()