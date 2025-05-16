from flask import Flask, jsonify, send_from_directory
app = Flask(__name__)

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(".", path)

if __name__ == "__main__":
    app.run(debug=True)