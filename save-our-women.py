import pyrebase
from flask import *
import os
from twilio.rest import Client
from datetime import datetime, timedelta
import time
import googlemaps


account_sid = "AC64d5bde78b62b02e3b6a90066b0f70ca"
auth_token = os.environ.get('API_TWILIO')
# ask vivian w for twilio api
client = Client(account_sid, auth_token)

google_api_key = os.environ.get('GOOGLE_API')
gmap_client = googlemaps.Client(key = google_api_key)

app = Flask(__name__)
app.secret_key = "hello"
app.permanent_session_lifetime = timedelta(days=30)

'''
!!! most returns and forms connect with HTML since idk react native/swift/etc and I used quick html for visualization/testing purposes
They can be changed to accomodate for whatever frontend language is used  
'''
# ask for api
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

# storage
storage = firebase.storage()

# uid is each user's unique id
uid = int(0)

@app.route('/')
def start():

    global uid

    # user session still logged in
    if "uid" in session:
        uid = session['uid']
        return jsonify({'reason': 'User still logged in', 'value': uid}), 200

    # user not logged in, prompt to log in page
    else:
        return({'reason': 'User not logged in'}), 400


@app.route('/signup', methods=['POST'])
def signup():

    # retrieves name, email, pass, and number from user
    name = request.json['name']
    email = request.json['email']
    password = request.json['pass']
    phone = request.json['num']

    # creates an account on database and requests for verification
    try:
        user = auth.create_user_with_email_and_password(email, password)
        auth.send_email_verification(user['idToken'])

    # message 'Account creation failed. Please ensure a new email or a password of at least 6 characters'
    except:
        return({'reason': 'Account creation unsuccessful'}), 400

    # sets session as permanent for x days and establishes the user uid
    global uid
    session.permanent = True
    uid = user['localId']
    session["uid"] = uid

    # assigns data and pushes to database
    data = {"Name": name, "Email": email, "Phone Number": phone}
    db.child("users").child(uid).child("details").set(data)

    return jsonify({'reason': 'Account successfully created', 'value': uid}), 200


@app.route('/login', methods=['POST'])
def login():

    global uid

    # checks if user still in session
    if "uid" in session:
        uid = session['uid']
        return jsonify({'reason': 'User still logged in', 'value': uid}), 200

    else:
        email = request.json['email']
        password = request.json['pass']

    # try to sign in
    try:
        user = auth.sign_in_with_email_and_password(email, password)

     # pop up message return "Invalid email and/or password"
    except:
        return({'reason': 'Invalid credentials'}), 400
    
    # create a permanent session of x days
    session.permanent = True
    uid = user['localId']
    session["uid"] = uid

    # a pop up message with logged in should show and it should then proceed to the home page
    return jsonify({'reason': 'Account successfully loggin in'}), 200


@app.route('/forgotpass', methods=['POST'])
def forgotpass():

    email = request.json['email'] if 'email' in request.json else None
    auth.send_password_reset_email(email)

    if email is None:
        return({'reason': 'Empty email entry'}), 400

    else: 
         message = "Email has been sent to " + email

        # should flash a message saying that an email has been sent to reset password
        return jsonify({'reason': 'Email sent to reset password', 'message': message}), 200

# logs out and returns to start


@app.route('/logout', methods=['GET', 'POST'])
def logout():

    session.pop("uid", None)

    return jsonify({'reason': 'Successful logout'}), 200

# dont think need a home page for back end?
'''
@app.route('/home', methods=['GET', 'POST'])
def home():

    global uid
    return render_template('home.html', value=uid)

# profile // TO BE EDITED, needs to display user information!!
'''

@app.route('/profile', methods=['GET'])
def profile():

    global uid
    name = db.child("users").child(uid).child('details').child('Name').get().val()
    email = db.child("users").child(uid).child('details').child('Email').get().val()
    phone = db.child("users").child(uid).child('details').child('Phone Number').get().val()

    return jsonify({'reason': 'Profile data bundle sent', 'name': name, 'email': email, 'phone': phone}), 200


@app.route('/emergency_contacts', methods=['GET'])
def emergency_contacts():

    global uid

    # arrays 
    name_arr = []
    phone_arr = []

    all_users = db.child("users").child(uid).child('emergency contacts').get()
    for user in all_users.each():
        name = user.key()
        name_arr.append(name)

        phone = user.val()
        phone_arr.append(phone)

    return jsonify({'reason': 'Emergency Contact data sent', 'name': name_arr}), 200


@app.route('/add_emergency_contact', methods=['POST'])
def add_emergency_contact():

    full_name = request.json['name']
    phone = request.json['num']

    name = str(full_name)

    # Name: Phone Number
    db.child("users").child(uid).child("emergency contacts").child(name).set(phone)

    return jsonify({'reason': 'Emergency Contact Added'}), 200


# sends sos message to the numbers listed below
@app.route('/send_emergency_sos', methods=['GET'])
def send_emergency_sos():

    global uid

    all_users = db.child("users").child(uid).child('emergency contacts').get()
    name = str(db.child("users").child(uid).child('details').child('Name').get().val())
    name = name.replace('"', "")

    phone_arr = []

    for user in all_users.each():

        phone = str(user.val())
        number = "+1" + phone

        phone_arr.append(number)

        # needs name or else find a way to use their own phone number
        message = "SOS! Your friend " + name + " is in trouble and needs your help at this location!"
        client.messages.create(
            body=message,
            from_="+13213042130",
            to=number
        )

    # pop up message to show the numbers that the message was sent to
    return jsonify({'reason': 'Emergency SOS sent to contacts', 'phone': phone_arr}), 200


@app.route('/make_report', methods=['POST'])
def make_report():

    # getting the time and changing to current timezone
    today = datetime.now()
    curr_time = time.localtime()

    day = today.strftime("%B %d, %Y ")
    curr_time = str(time.strftime("%H:%M", curr_time))
    clock = datetime.strptime(curr_time, "%H:%M")
    clock = clock.strftime("%I:%M %p").lstrip('0')
    date = day + clock

    # gets report information to be pushed to database
    location = request.json['location']
    report = request.json['report']
    photo = request.files['fileToUpload']
    lat = request.json['latitude']
    lng = request.json['longitude']

    picture = str(photo)

    # if the person did not upload a picture
    if picture == "<FileStorage: '' ('application/octet-stream')>":
        link = ""

    # picture is uploaded to firebase storage and url is generated and pushed to database
    else:
        storage.child("images/" + picture).put(photo)
        link = storage.child('images/' + picture).get_url(None)
        db.child("reports").child(date).child('image').set(link)

    # push more information to database
    db.child("reports").child(date).child('location').set(location)
    db.child("reports").child(date).child('report').set(report)
    db.child("coordinates").child(date).child("latitude").set(lat)
    db.child("coordinates").child(date).child("longitude").set(lng)

    return jsonify({'reason': 'Incident Report created'}), 200

# need more instruction on how to filter it: location/time etc
@app.route('/recent_reports', methods=['GET'])
def recent_reports():
    
    all_reports = db.child("reports").get()

    incident_arr = []
    details_arr = []

    for report in all_reports.each():
        date = str(report.key())
        date = date.replace('"', "")
        details_arr.append(date)

        reps = db.child("reports").child(date).get()

        for rep in reps.each():
            detail = str(rep.val())
            detail = detail.replace('"', "")
            detail = detail.replace('{', "")
            detail = detail.replace('}', "")

            details_arr.append(detail)

        incident_arr.insert(0, details_arr)
        details_arr = []
        

    # returns array of arrays, [[DATE + TIME, URL TO IMAGE, LOCATION, INCIDENT], [August 12, 2020 08:40 PM, https://, LA, INCIDENT]]
    # SOME REPORTS MAY NOT HAVE URLS!!! 
    return jsonify({'reason': 'Recent Reports Bundle Created', 'reports': incident_arr}), 200

@app.route('/map', methods=['GET'])
def map():

    all_coords = db.child("coordinates").get()

    coords_arr = []
    details_arr = []

    # iterate through the coordinates child 
    for coords in all_coords.each():
        date = str(coords.key())
        date = date.replace('"', "")
        details_arr.append(date)

        reps = db.child("coordinates").child(date).get()

        # iterate through the lat and long INSIDE the dates
        for rep in reps.each():
            detail = str(rep.val())
            detail = detail.replace('"', "")
            detail = detail.replace('{', "")
            detail = detail.replace('}', "")

            details_arr.append(detail)

        coords_arr.append(details_arr)
        details_arr = []

     # [[DATE, LAT, LONG], [DATE, LAT, LONG]]
    return jsonify({'reason': 'Coordinates of Incidents Sent', 'coord': coords_arr}), 200

if __name__ == '__main__':
    app.run()
