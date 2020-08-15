FROM python:3.8-slim-buster
WORKDIR /app
ENV FLASK_APP save-our-women.py
ENV FLASK_RUN_HOST 0.0.0.0
RUN apt-get update -y && apt-get install -y python-pip 
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]