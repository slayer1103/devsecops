from flask import Flask
import os

app = Flask(__name__)

@app.route("/")
def home():
    return {
        "message": "Hello from Kubernetes!",
        "environment": os.getenv("APP_ENV", "unknown"),
        "db_user": os.getenv("DB_USER", "not-set")
    }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)