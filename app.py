from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)


# Path to C++ exe
CPP_PATH = os.path.abspath("../backend/main.exe")

def get_suggestions(prefix):
    result = subprocess.run([CPP_PATH, prefix], capture_output=True, text=True)
    suggestions = result.stdout.strip().split("\n")
    return suggestions[:5]

@app.get("/suggest")
def suggest():
    query = request.args.get("q", "")
    if query == "":
        return jsonify({"suggestions": []})
    suggestions = get_suggestions(query)
    return jsonify({"suggestions": suggestions})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
