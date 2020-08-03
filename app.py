import pyrebase
from flask import *

app = Flask(__name__)

'''
!!! most returns and forms connect with HTML since idk react native/swift/etc and I used quick html for visualization/testing purposes
They can be changed to accomodate for whatever frontend language is used  
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

@app.route('/')
def start():

    return render_template("start.html")

@app.route('/signup', methods=['GET', 'POST'])
def signup():

    if request.method == 'GET':
        return render_template('signup.html')

    else:
        # retrieves email, pass, and number from user
        email = request.form['email']
        password = request.form['pass']
        phone = request.form['num']

        try: 
             # creates an account on database and requests for verification
            user = auth.create_user_with_email_and_password(email, password)
            auth.send_email_verification(user['idToken'])

            global uid
            uid = user['localId']
            
            data={"Email": email, "Phone Number": phone}

            db.child("users").child(uid).child("details").set(data)
            return render_template('add_emergency_contact.html', value=uid)

        except:
            # message 'Account creation failed. Please ensure a new email or a password of at least 6 characters'
            return render_template('signup.html')

# sign up -> add emergency contacts

@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'GET': 
        return render_template('login.html')

    else:
        email = request.form['email']
        password = request.form['pass']

    # issue with email verification, don't know how to check for email verified or not
    try: 
        user = auth.sign_in_with_email_and_password(email, password)
        global uid 
        uid = user['localId']

        # a pop up message with logged in should show and it should then proceed to the home page 
        return render_template('home.html') 
 
    except:
        # pop up message return "Invalid email and/or password"
        return render_template('login.html')


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

    auth.logout()
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
        first_name = request.form['first']
        last_name = request.form['last']
        phone = request.form['num']

        name = str(first_name) + " " + str(last_name)
        db.child("users").child(uid).child("emergency contacts").child(name).set(phone)

    return render_template('home.html')

if __name__ == '__main__':
    app.run()
