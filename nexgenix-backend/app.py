import os
import sqlite3
from flask import Flask, request, redirect, session
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key")

DB_PATH = "users.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def health():
    return "Backend is running ✅"

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

    if user and check_password_hash(user["password"], password):
        session["user_id"] = user["id"]
        return redirect("https://nexgenixcreativesolutions.github.io/dashboard.html")

    return "Invalid login", 401

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
