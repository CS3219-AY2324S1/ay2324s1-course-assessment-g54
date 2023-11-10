FROM python:3.9-alpine
WORKDIR /app
RUN pip install flask flask_cors black
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
