import pyrebase
from flask import *
import os
from twilio.rest import Client
from datetime import datetime, timedelta
import pytz

account_sid = "AC64d5bde78b62b02e3b6a90066b0f70ca"
auth_token = "52346e71802d7fe93145f63f6f63603b"

client = Client(account_sid, auth_token)

app = Flask(__name__)
app.permanent_session_lifetime = timedelta(days=5)
'''
THIS VERSION IS TO CONNECT WITH REACT NATIVE/JS FRONT END
'''

firebaseConfig = {
    'apiKey': "AIzaSyA1UYeJTygTIPNIBTLd_upZ8EsCjL5iUNs",
    'authDomain': "save-our-women-b9aef.firebaseapp.com",
    'databaseURL': "https://save-our-women-b9aef.firebaseio.com",
    'projectId': "save-our-women-b9aef",
    'storageBucket': "save-our-women-b9aef.appspot.com",
    'messagingSenderId': "53046274329",
    'appId': "1:53046274329:web:92782bf1780b708be63d88",
    'measurementId': "G-62FZQ6M0FF"
}

firebase = pyrebase.initialize_app(firebaseConfig)

# authentication
auth = firebase.auth()

# database
db = firebase.database()

uid = int(0)


@app.route('/signup', methods=['POST'])
def signup():

    # retrieves email, pass, and number from user
    email = request.json['email']
    password = request.json['pass']
    phone = request.json['num']

    try:
        # creates an account on database and requests for verification
        user = auth.create_user_with_email_and_password(email, password)
        auth.send_email_verification(user['idToken'])

    except:
        # message 'Account creation failed. Please ensure a new email or a password of at least 6 characters'
        return({'reason': 'Account creation unsuccessful'}), 400

    session.permanent = True
    global uid
    uid = user['localId']
    session["uid"] = uid

    data = {"Email": email, "Phone Number": phone}
    db.child("users").child(uid).child("details").set(data)

    return jsonify('reason': 'Account successfully created'), 200

# sign up -> add emergency contacts


@app.route('/login', methods=['POST'])
def login():

    email = request.json['email']
    password = request.json['pass']

    # issue with email verification, don't know how to check for email verified or not
    try:
        user = auth.sign_in_with_email_and_password(email, password)

    except:
        # pop up message return "Invalid email and/or password"
        return({'reason': 'Invalid credentials'}), 400
    
    session.permanent = True
    global uid
    uid = user['localId']
    session["uid"] = uid

    # a pop up message with logged in should show and it should then proceed to the home page
    return jsonify('reason': 'Account successfully created'), 200


@app.route('/forgotpass', methods=['POST'])
def forgotpass():

    email = request.json['email']
    auth.send_password_reset_email(email)

    message = "Password reset has been sent to " + email

    # should flash a message saying that an email has been sent to reset password
    return jsonify('reason': message), 200


# logs out and returns to start
@app.route('/logout', methods=['GET', 'POST'])
def logout():

    session.pop("uid", None)
    auth.logout()
    return jsonify('reason': 'Successful logout'), 200


# home screen
@app.route('/home', methods=['GET', 'POST'])
def home():

    global uid
    return render_template('home.html', value=uid)

# profile // TO BE EDITED, needs to display user information!!


@app.route('/profile', methods=['GET', 'POST'])
def profile():
    # profile -> emergency contact -> add emergency contacts

    global uid
    email = db.child("users").child(uid).child('details').child('Email').get().val()
    phone = db.child("users").child(uid).child('details').child('Phone Number').get().val()

    return render_template('profile.html', email=email, phone=phone)


@app.route('/emergency_contacts', methods=['GET', 'POST'])
def emergency_contacts():

    global uid

    name_arr = []
    phone_arr = []

    all_users = db.child("users").child(uid).child('emergency contacts').get()
    for user in all_users.each():
        name = user.key()
        name_arr.append(name)

    return render_template('emergency_contacts.html', name=name_arr)


@app.route('/add_emergency_contact', methods=['GET', 'POST'])
def add_emergency_contact():

    if request.method == 'GET':
        return render_template('add_emergency_contact.html')

    else:
        full_name = request.form['name']
        phone = request.form['num']

        name = str(full_name)

        # Name: Phone Number
        db.child("users").child(uid).child("emergency contacts").child(name).set(phone)

    return render_template('home.html')


# sends sos message to the numbers listed below
@app.route('/send_emergency_sos', methods=['GET', 'POST'])
def send_emergency_sos():

    global uid

    all_users = db.child("users").child(uid).child('emergency contacts').get()

    phone_arr = []

    for user in all_users.each():

        phone = str(user.val())
        number = "+1" + phone

        phone_arr.append(number)

        # needs name or else find a way to use their own phone number
        client.messages.create(
            body="Quick, your friend is in trouble at this location!",
            from_="+13213042130",
            to=number
        )

    return render_template('send_emergency_sos.html', phone=phone_arr)


@app.route('/make_report', methods=['GET', 'POST'])
def make_report():

    if request.method == 'GET':
        return render_template('make_report.html')

    else:

        # not time zoned yet
        today = datetime.now()
        date = today.strftime("%B %d, %Y %H:%M:%S")

        # user should be able to search with google api 
        location = request.form['location']
        report = request.form['report']
        db.child("reports").child('location').child(location).child(date).set(report)

    return render_template('home.html')

# need more instruction on how to filter it: location/time etc
@app.route('/recent_reports', methods=['GET', 'POST'])
def recent_reports():
    
    all_reports = db.child("reports").child('location').get()

    incident_arr = []

    for report in all_reports.each():
        location = str(report.key())
        location = location.replace('"', "")
        incident_arr.append(location)

        reps = db.child("reports").child('location').child(location).order_by_key().get()

        for rep in reps.each():
            date = str(rep.key())
            date = date.replace('"', "")

            incident = str(rep.val())
            incident = incident.replace('"', "")
            incident = incident.replace('{', "")
            incident = incident.replace('}', "")

            incident = date + " - " + incident

            incident_arr.append(incident)
        

    # returns array of arrays, [["LA, CA", "Aug 3, 2020 - this is what happened"], ["SD, CA", "Aug 3, 2020 - incident"]]
    return render_template('recent_reports.html', reports=incident_arr)

if __name__ == '__main__':
    app.run()