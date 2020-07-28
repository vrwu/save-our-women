import pyrebase
from flask import *

app = Flask(__name__)

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
auth = firebase.auth()

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/signup', methods=['GET', 'POST'])
def signup():

    if request.method == 'GET':
        return render_template('signup.html')

    else:
        # retrieves email and pass from user
        email = request.form['name']
        password = request.form['pass']

        try: 
             # creates an account on database and requests for verification
            user = auth.create_user_with_email_and_password(email, password)
            auth.send_email_verification(user['idToken'])

            # returns message for now that leads to deadend but maybe a pop up message instead
            # needs coordinating with front end
           # return 'Account Created! Please verify email before signing in'
            return redirect(url_for('login'))

        except:

            #same as the account created, probably a pop up message
            return 'Account creation failed. Please ensure a new email or a password of at least 6 characters'
    return render_template('signup.html', error=error)


@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'GET':
        return render_template('login.html')
    else:
        email = request.form['name']
        password = request.form['pass']

        # issue with email verification, don't know how to check for email verified or not
        if (auth.User.emailVerified == False):
            return "Email not verified!"
            return redirect(url_for('login'))
        try: 
            login = auth.sign_in_with_email_and_password(email, password)
            return "Logged In"
        except:
            return "Invalid email and/or password"
    #return render_template('login.html')

if __name__ == '__main__':
    app.run()
