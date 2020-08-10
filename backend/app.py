import pyrebase
from flask import *
import os
from twilio.rest import Client
from datetime import datetime, timedelta
import pytz

account_sid = "AC64d5bde78b62b02e3b6a90066b0f70ca"
auth_token = os.environ.get('API_TWILIO')

client = Client(account_sid, auth_token)

app = Flask(__name__)
app.secret_key = "hello"
app.permanent_session_lifetime = timedelta(days=5)

'''
!!! most returns and forms connect with HTML since idk react native/swift/etc and I used quick html for visualization/testing purposes
They can be changed to accomodate for whatever frontend language is used  
'''

firebaseConfig = {
    'apiKey': os.environ.get('API_FIREBASE'),
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

@app.route('/')
def start():

    global uid
    if "uid" in session:
        uid = session['uid']
        return render_template('home.html', value=uid)

    else:
        return render_template("start.html")


@app.route('/signup', methods=['GET', 'POST'])
def signup():

    if request.method == 'GET':
        return render_template('signup.html')

    else:
        # retrieves name, email, pass, and number from user
        name = request.form['name']
        email = request.form['email']
        password = request.form['pass']
        phone = request.form['num']

        try:
            # creates an account on database and requests for verification
            user = auth.create_user_with_email_and_password(email, password)
            auth.send_email_verification(user['idToken'])

        except:
            # message 'Account creation failed. Please ensure a new email or a password of at least 6 characters'
            return render_template('signup.html')

        global uid
        session.permanent = True
        uid = user['localId']
        session["uid"] = uid

        data = {"Name": name, "Email": email, "Phone Number": phone}
        db.child("users").child(uid).child("details").set(data)
        return render_template('add_emergency_contact.html', value=uid)

# sign up -> add emergency contacts


@app.route('/login', methods=['GET', 'POST'])
def login():

    global uid
    if request.method == 'GET':

        if "uid" in session:
            uid = session['uid']
            return render_template('home.html', value=uid)

        else: 
            return render_template('login.html')

    else:
        email = request.form['email']
        password = request.form['pass']

    # issue with email verification, don't know how to check for email verified or not
    try:
        user = auth.sign_in_with_email_and_password(email, password)

    except:
        # pop up message return "Invalid email and/or password"
        return render_template('login.html')
    
    session.permanent = True
    uid = user['localId']
    session["uid"] = uid

    # a pop up message with logged in should show and it should then proceed to the home page
    return render_template('home.html')


@app.route('/forgotpass', methods=['GET', 'POST'])
def forgotpass():

    if request.method == 'GET':
        return render_template('forgotpass.html')

    else:
        email = request.form['email']
        auth.send_password_reset_email(email)

    # should flash a message saying that an email has been sent to reset password
    return render_template('login.html')

# logs out and returns to start


@app.route('/logout', methods=['GET', 'POST'])
def logout():

    session.pop("uid", None)
    # auth.logout()
    return render_template('start.html')

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
    name = db.child("users").child(uid).child('details').child('Name').get().val()
    email = db.child("users").child(uid).child('details').child('Email').get().val()
    phone = db.child("users").child(uid).child('details').child('Phone Number').get().val()

    return render_template('profile.html', name=name, email=email, phone=phone)


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
