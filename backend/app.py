from flask import Flask, request, Response, jsonify
import sqlite3
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['DB_NAME'] = 'scs2019.db'

@app.route('/')
@cross_origin()
def hello():
    return "Hello World!"

@app.route('/user', methods=["PUT"])
@cross_origin()
def create_user():
    connection = sqlite3.connect(app.config['DB_NAME'])

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
    connection = sqlite3.connect(app.config['DB_NAME'])
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
    connection = sqlite3.connect(app.config['DB_NAME'])
    cur = connection.cursor()

    if request.method == "GET":
        cur.execute("SELECT * FROM questions")
        fetched = cur.fetchall()
        connection.close()

        # QUESTION = (id, question, answer, mc1, mc2, mc3, mc4)
        questions = {'questions': fetched}
        return jsonify(fetched)

@app.route('/quiz_attempt', methods=['PUT'])
@cross_origin()
def attempt():
    connection = sqlite3.connect(app.config['DB_NAME'])

    content = request.json
    user = content['user']
    score = content['score']

    connection.execute("INSERT INTO quiz_attempts (user, 'score') VALUES (?, ?)", (user, score))
    connection.commit()
    connection.close()
    return "OK"

@app.route('/leaderboard', methods=['GET'])
@cross_origin()
def leaderboard():
    connection = sqlite3.connect(app.config['DB_NAME'])
    curr = connection.cursor()

    curr.execute("SELECT * FROM quiz_attempts")
    attempts = curr.fetchall()
    connection.close()

    users = {}
    for attempt in attempts:
        if attempt[0] not in users:
            users[attempt[0]] = attempt[1]
        else:
            users[attempt[0]] = max(users[attempt[0]], attempt[1])

    result = []
    for key, val in users.items():
        result.append((key, val))

    return jsonify(sorted(result, key=lambda x: -x[1]))


if __name__ == '__main__':
    app.run()