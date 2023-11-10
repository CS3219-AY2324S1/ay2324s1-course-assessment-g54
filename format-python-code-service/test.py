import black

# test.py
code = "def hello_world(): print     ('Hello, World!')"
formatted_code = black.format_str(code, mode=black.Mode())
print(formatted_code)