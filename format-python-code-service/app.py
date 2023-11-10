from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import black

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/format', methods=['POST'])
def format_code():
    # data = request.get_json()
    data = { "code": "def hello_world(): print     ('Hello, World!')"}
    code = data.get('code', '')

    formatted_code = black.format_str(code, mode=black.Mode())
    
    return jsonify({'formatted_code': formatted_code})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)