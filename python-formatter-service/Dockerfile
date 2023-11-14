FROM python:3.9-alpine
WORKDIR /app
RUN pip install black waitress
COPY . .
EXPOSE 5000
CMD ["waitress-serve", "--port=5000", "app:handle_request"]
