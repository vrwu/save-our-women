import pyrebase
from flask import *
from flask import Flask, session, request
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
        # retrieves email and pass from user
        email = request.form['email']
        password = request.form['pass']

        try: 
             # creates an account on database and requests for verification
            user = auth.create_user_with_email_and_password(email, password)
            auth.send_email_verification(user['idToken'])

            global uid
            uid = user['localId']
            first_name = request.form['first']
            last_name = request.form['last']
            phone = request.form['num']

            data={"First Name": first_name, "Last Name": last_name, "Phone Number": phone, "Email": email}

            db.child("users").child(uid).child("details").set(data)
            return render_template('login.html')

            # pop up message'Account Created! Please verify email before signing in'

            # redirects to profile so new user can create a profile to be added to database
            # return redirect(url_for('profile'))

        except:

            # same as the account created, probably a pop up message
            return 'Account creation failed. Please ensure a new email or a password of at least 6 characters'
            return render_template('signup.html')


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


# sends an email to change password
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

    if request.method == 'GET':

        info = db.child("users").child(uid).get()

        print(info.val())
        # return render_template('profile.html')

    # only accomodates for new users only
    # NEEDS A FEATURE so that existing users can edit their info without having
    # a new form or pushing a new user to database
    # need to figure out a way to KEEP user's email and pass associated with this unit in database
    else:
        first_name = request.form['first']
        last_name = request.form['last']
        phone = request.form['num']

        data={"First Name": first_name, "Last Name": last_name, "Phone Number": phone}
        db.push(data)

    return render_template('login.html')    

@app.route('/emergency_contacts', methods=['GET', 'POST'])
def emergency_contacts(): 
    
    global uid
    if request.method == 'GET':
        # needs to display the emergency contacts
        return render_template('emergency_contacts.html', value=uid)
    
@app.route('/add_emergency_contact', methods=['GET', 'POST'])
def add_emergency_contact():

    if request.method == 'GET':
        return render_template('add_emergency_contact.html')

    else:
        first_name = request.form['first']
        last_name = request.form['last']
        phone = request.form['num']

        data={"First Name": first_name, "Last Name": last_name, "Phone Number": phone}
        db.child("users").child(uid).child("emergency contacts").push(data)

    return render_template('home.html')

if __name__ == '__main__':
    app.run()
