FROM python:3.8
WORKDIR /backend
COPY ./requirements.txt /backend/requirements.txt
RUN pip install -r requirements.txt
copy ./backend .
EXPOSE 5000
CMD ["python", "./app.py"]