FROM python:3.8
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
copy backend/ .
EXPOSE 5000
CMD ["python", "./app.py"]