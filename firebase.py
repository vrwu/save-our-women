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

            # returns message for now that leads to deadend but maybe a pop up message instead
            # needs coordinating with front end

            # this can probably be a message
            # return 'Account Created! Please verify email before signing in'

            # redirects to profile so new user can create a profile to be added to database
            return redirect(url_for('profile'))

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
        login = auth.sign_in_with_email_and_password(email, password)

        # a pop up message with logged in should show and it should then proceed to the home page
        return "Logged In"

    except:

        # a pop up message
        return "Invalid email and/or password"
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

@app.route('/profile', methods=['GET', 'POST'])
def profile():

    if request.method == 'GET':
        return render_template('profile.html')

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

if __name__ == '__main__':
    app.run()
