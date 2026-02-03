from flask import Flask, request, redirect, session
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "super-secret-key"

def get_db():
    return sqlite3.connect("users.db")

@app.route("/signup", methods=["POST"])
def signup():
    data = request.form
    hashed_pw = generate_password_hash(data["password"])

    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO users (first_name, last_name, email, phone, password)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data["first_name"],
        data["last_name"],
        data["email"],
        data["phone"],
        hashed_pw
    ))
    db.commit()
    db.close()

    return redirect("https://nexgenixcreativesolutions.github.io")

@app.route("/login", methods=["POST"])
def login():
    email = request.form["email"]
    password = request.form["password"]

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT id, password FROM users WHERE email=?", (email,))
    user = cursor.fetchone()
    db.close()

    if user and check_password_hash(user[1], password):
        session["user_id"] = user[0]
        return redirect("https://nexgenixcreativesolutions.github.io/dashboard.html")

    return "Invalid login", 401
