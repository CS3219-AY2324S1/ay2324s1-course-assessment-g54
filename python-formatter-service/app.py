from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import black

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/format', methods=['POST'])
    def format_code():
        data = request.get_json()
        code = data.get('code', '')

        formatted_code = black.format_str(code, mode=black.Mode())

        return jsonify({'formatted_code': formatted_code})

    return app

if __name__ == '__main__':
    from waitress import serve
    serve(create_app(), host='0.0.0.0', port=5000)