from http import server
import json
import black

def handle_request(environ, start_response):
    if environ['REQUEST_METHOD'] == 'OPTIONS':
        # Handle preflight CORS request
        status = '200 OK'
        response_headers = [
            ('Content-type', 'text/plain'),
            ('Access-Control-Allow-Origin', 'http://localhost:3000'),
            ('Access-Control-Allow-Methods', 'POST'),
            ('Access-Control-Allow-Headers', 'Content-Type'),
        ]
        start_response(status, response_headers)
        return [b'OK']
    elif environ['REQUEST_METHOD'] == 'POST' and environ['PATH_INFO'] == '/format':
        # Read the request data
        try:
            content_length = int(environ.get('CONTENT_LENGTH', '0'))
        except ValueError:
            content_length = 0
        data = environ['wsgi.input'].read(content_length)

        # Parse JSON data
        try:
            json_data = json.loads(data.decode('utf-8'))
            code = json_data.get('code', '')
            formatted_code = black.format_str(code, mode=black.Mode())
            response_body = json.dumps({'formatted_code': formatted_code})
        except json.JSONDecodeError:
            response_body = 'Invalid JSON data'

        # Set response headers
        status = '200 OK'
        response_headers = [
            ('Content-type', 'application/json'),
            ('Access-Control-Allow-Origin', 'http://localhost:3000'),
        ]

        # Send the response
        start_response(status, response_headers)
        return [response_body.encode('utf-8')]
    else:
        # Handle other routes or methods as needed
        status = '404 Not Found'
        response_headers = [
            ('Content-type', 'text/plain'),
            ('Access-Control-Allow-Origin', 'http://localhost:3000'),
        ]
        start_response(status, response_headers)
        return [b'Not Found']

if __name__ == '__main__':
    # Run the application using Waitress
    from waitress import serve
    serve(handle_request, host='0.0.0.0', port=5000)
